import axios from 'axios';
import BASE_URL from '../constants/Url';

class SalesManagerService {
    async uploadFile(uploadedFile) {
        try {
            const formData = new FormData();
            formData.append('file', uploadedFile);

            await axios.post(`${BASE_URL}/transactions/upload`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            });

            console.log("File uploaded successfully");
        } catch (error) {
            console.error({
                action: "sales-manager-service-upload-file",
                message: "Error uploading file",
                data: error
            });
            throw error
        }
    };
    async fetchTransactions() {
        try {
            const response = await axios.get(`${BASE_URL}/transactions`);

            console.log({
                action: "transactions-service-fetch-transactions",
                message: "Find transactions successfully",
                data: response.data
            });

            return response.data.data;
        } catch (error) {
            console.error({
                action: "sales-manager-service-fetch-transactions",
                message: "Error finding transactions",
                data: error
            });
            throw error
        }
    };

    async fetchTotalAffiliateBalance(product) {
        try {
            const response = await axios.get(`${BASE_URL}/transactions/affiliated/total-balance`, {
                params: {
                    product
                }
            });

            console.log({
                action: "sales-manager-service-fetch-total-affiliated-balance",
                message: "Find total affiliate balance successfully",
                data: response.data
            });

            return response.data.data;
        } catch (error) {
            console.error({
                action: "sales-manager-service-fetch-total-affiliated-balance",
                message: "Error finding total affiliate balance",
                data: error
            });
            throw error
        }
    };

    async fetchTotalProducerBalance(product) {
        try {
            console.log({ product })
            const response = await axios.get(`${BASE_URL}/transactions/producer/total-balance`, {
                params: {
                    product
                }
            });

            console.log({
                action: "sales-manager-service-fetch-total-producer-balance",
                message: "Find total producer balance successfully",
                data: response.data
            });

            return response.data.data;
        } catch (error) {
            console.error({
                action: "sales-manager-service-fetch-total-producer-balance",
                message: "Error finding total producer balance",
                data: error
            });
            throw error
        }
    };
}

export default SalesManagerService;

