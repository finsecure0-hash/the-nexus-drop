export class UserProfileService {
  constructor() {
    this.storageKey = 'user_profile';
  }

  async saveProfile(profileData) {
    try {
      const existingData = this.getProfile();
      const updatedData = {
        ...existingData,
        ...profileData,
        lastUpdated: new Date().toISOString()
      };
      
      localStorage.setItem(this.storageKey, JSON.stringify(updatedData));
      return updatedData;
    } catch (error) {
      console.error('Error saving profile:', error);
      throw error;
    }
  }

  getProfile() {
    try {
      const data = localStorage.getItem(this.storageKey);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Error getting profile:', error);
      return null;
    }
  }

  async updateWalletInfo(walletData) {
    try {
      const profile = this.getProfile() || {};
      const updatedProfile = {
        ...profile,
        wallet: {
          ...profile.wallet,
          ...walletData,
          lastUpdated: new Date().toISOString()
        }
      };
      
      return this.saveProfile(updatedProfile);
    } catch (error) {
      console.error('Error updating wallet info:', error);
      throw error;
    }
  }

  async updateTransactionHistory(transactions) {
    try {
      const profile = this.getProfile() || {};
      const updatedProfile = {
        ...profile,
        transactions: {
          history: transactions,
          lastUpdated: new Date().toISOString()
        }
      };
      
      return this.saveProfile(updatedProfile);
    } catch (error) {
      console.error('Error updating transaction history:', error);
      throw error;
    }
  }

  clearProfile() {
    try {
      localStorage.removeItem(this.storageKey);
    } catch (error) {
      console.error('Error clearing profile:', error);
      throw error;
    }
  }
} 