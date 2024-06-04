const API_BASE_URL = 'https://a4b3-187-190-138-154.ngrok-free.app/api/User/CheckUserPayment';

export const checkPayment = async (userId) => {
    const CheckUserPayment = async () => {
        const response = await fetch(`${API_BASE_URL}/${userId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userId })
        });

        if (!response.ok) {
            throw new Error('Error en la respuesta de la API, Paypal');
        }

        const data = await response.json();
        return data;
    };

    try {
        // Primera verificación
        let result = await CheckUserPayment();
        if (result === true) {
            return true;
        }
        // Esperar un breve periodo antes de la segunda verificación
        await new Promise(resolve => setTimeout(resolve, 1000));
        // Segunda verificación
        result = await CheckUserPayment();
        return result;

    } catch (error) {
        console.error('Error', error);
        throw error;
    }
};

