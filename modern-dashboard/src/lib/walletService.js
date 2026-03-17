import { supabase } from './supabaseClient';
import { auth } from '../firebase';

/**
 * Ensures a user has a wallet. If not, initializes it with seed capital.
 * @param {string} userId - The unique identifier for the user (e.g., Firebase UID).
 * @param {string} email - The user's email for special identification.
 * @returns {Promise<object>} The user's wallet data.
 */
export const initializeWallet = async (userId, email = '') => {
    if (!userId) return null;
    
    const userEmail = (email || '').toLowerCase().trim();
    const isFounder = userEmail.includes('silguero') || userEmail.includes('f92');
    
    console.log("[DEBUG-WALLET-FOUNDER]", { email: userEmail, isFounder, userId });

    try {
        console.log("[DEBUG-INIT] Starting initialization for:", userId);

        // 1. Basic Profile Sync (perfiles) - Now using TEXT ID
        try {
            await supabase.from('perfiles').upsert({ 
                id: userId, 
                nombre: auth.currentUser?.displayName || '',
                email: userEmail,
                updated_at: new Date().toISOString() 
            });
        } catch(e) {
            console.warn("[DEBUG-INIT] perfiles sync (optional) failed:", e);
        }

        // 2. Wallet Check/Create
        const { data: walletData, error: fetchError } = await supabase
            .from('user_wallets')
            .select('*')
            .eq('id', userId)
            .maybeSingle();

        if (walletData) {
            console.log("[DEBUG-INIT] Current Wallet State:", walletData);
            return walletData;
        }

        // 3. Create new if missing
        console.log("[DEBUG-INIT] Creating new wallet for user...");
        const seed = {
            id: userId,
            ars_balance: isFounder ? 100000000 : 1000000,
            usd_balance: isFounder ? 100000 : 10000,
            updated_at: new Date().toISOString()
        };

        const { data: newWallet, error: createError } = await supabase
            .from('user_wallets')
            .insert(seed)
            .select()
            .single();

        if (createError) {
            console.error("[DEBUG-INIT] Supabase Insertion Error:", createError);
            return { error: createError.message, details: createError };
        }

        console.log("[DEBUG-INIT] Wallet created successfully!");
        return newWallet;
    } catch (error) {
        console.error("[DEBUG-INIT] Critical failure:", error);
        return { error: error.message };
    }
};

/**
 * Fetches the user's current wallet balance and active assets.
 */
export const getUserFinancialData = async (userId, email = '') => {
    if (!userId) return null;

    try {
        // Guarantee wallet is initialized and corrected (especially for Founder)
        await initializeWallet(userId, email);

        const [walletRes, assetsRes, historyRes] = await Promise.all([
            supabase.from('user_wallets').select('*').eq('id', userId).single(),
            supabase.from('user_assets').select('*').eq('user_id', userId),
            supabase.from('trade_history').select('*').eq('user_id', userId).order('created_at', { ascending: false }).limit(10)
        ]);

        return {
            wallet: walletRes.data,
            assets: assetsRes.data || [],
            history: historyRes.data || []
        };
    } catch (error) {
        console.error("Error fetching financial data:", error);
        return null;
    }
};

/**
 * Executes a trade (Buy/Sell) and persists changes.
 */
export const executeTrade = async (userId, tradeData) => {
    const { ticker, type, quantity, price, currency = 'ARS' } = tradeData;
    const totalCost = quantity * price;

    try {
        // 1. Get current wallet
        const { data: wallet, error: walletError } = await supabase
            .from('user_wallets')
            .select('*')
            .eq('id', userId)
            .single();

        if (walletError) throw walletError;

        // 2. Validate balance
        const balanceField = currency === 'ARS' ? 'ars_balance' : 'usd_balance';
        if (type === 'BUY' && wallet[balanceField] < totalCost) {
            throw new Error("Saldo insuficiente");
        }

        // 3. Update wallet balance
        const newBalance = type === 'BUY' 
            ? wallet[balanceField] - totalCost 
            : wallet[balanceField] + totalCost;

        const { error: updateWalletError } = await supabase
            .from('user_wallets')
            .update({ [balanceField]: newBalance, updated_at: new Date().toISOString() })
            .eq('id', userId);

        if (updateWalletError) throw updateWalletError;

        // 4. Update assets (Simple logic for now: upsert)
        // Note: For real trading, you'd calculate average price, but keeping it simple for simulator
        const { data: existingAsset } = await supabase
            .from('user_assets')
            .select('*')
            .eq('user_id', userId)
            .eq('ticker', ticker)
            .single();

        let newQuantity = type === 'BUY' 
            ? (existingAsset?.quantity || 0) + quantity 
            : (existingAsset?.quantity || 0) - quantity;

        if (newQuantity < 0) throw new Error("Acciones insuficientes");

        const { error: assetError } = await supabase
            .from('user_assets')
            .upsert({
                user_id: userId,
                ticker: ticker,
                quantity: newQuantity,
                average_price: price, // Simple overwrite for MVP
                last_updated: new Date().toISOString()
            });

        if (assetError) throw assetError;

        // 5. Record trade history
        const { error: historyError } = await supabase
            .from('trade_history')
            .insert({
                user_id: userId,
                ticker: ticker,
                type: type,
                amount: quantity,
                price_at_execution: price,
                created_at: new Date().toISOString()
            });

        if (historyError) throw historyError;

        return { success: true, newBalance };

    } catch (error) {
        console.error("Trade execution error:", error);
        return { success: false, error: error.message };
    }
};

/**
 * Fetches academic progress for a user.
 */
export const getUserProgress = async (userId) => {
    if (!userId) return [];
    try {
        const { data, error } = await supabase
            .from('user_progress')
            .select('*')
            .eq('user_id', userId);
        
        if (error) throw error;
        return data || [];
    } catch (error) {
        console.error("Error fetching academic progress:", error);
        return [];
    }
};

/**
 * Updates progress for a specific course.
 */
export const updateCourseProgress = async (userId, courseTitle, progress, lastLesson = '') => {
    if (!userId) return { success: false };
    try {
        const { data, error } = await supabase
            .from('user_progress')
            .upsert({
                user_id: userId,
                course_title: courseTitle,
                progress: progress,
                status: progress >= 100 ? 'completed' : 'in-progress',
                last_lesson: lastLesson,
                updated_at: new Date().toISOString()
            })
            .select()
            .single();

        if (error) throw error;
        return { success: true, data };
    } catch (error) {
        console.error("Error updating course progress:", error);
        return { success: false, error: error.message };
    }
};
