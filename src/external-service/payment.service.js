import axios from 'axios';

export class PaymentService {
	token = undefined;
	url = procdess.env.PAY_ME_URL_TEST;
	xAuth;
	constructor(_xAuth) {
		xAuth = _xAuth;
	}

	async createCard({ card: { number, expire }, account, save }) {
		const card = {
			card: {
				number,
				expire,
			},
			account,
			save,
		};

		const headers = {
			Host: 'checkout.test.paycom.uz',
			'X-Auth': '100fe486b33784292111b7dc',
			'Cache-Control': 'no-cache',
		};

		// const card = {
		// 	id: 123,
		// 	method: 'cards.create',
		// 	params: {
		// 		card: { number: '8600069195406311', expire: '0399' },
		// 		save: true,
		// 	},
		// };
		try {
			const res = await axios.post(this.url, card, { headers });
			/*
			{
				card: {
						number: String,
						expire: String,
						token: String,
						recurrent: Boolean, Флаг. Флаг определяет доступность карты для последующих платежей.
						verify: Boolean Флаг. Если флаг true карта проверена способом OTP (one time password).
						}
				}


				{
					"jsonrpc": "2.0",
					"id": 123,
					"result": {
							"card": {
									"number": "860006******6311",
									"expire": "03/99",
									"token": "NTg0YTg0ZDYyYWJiNWNhYTMxMDc5OTE0X1VnYU02ME92IUttWHVHRThJODRJNWE0Xl9EYUBPQCZjNSlPRlpLIWNWRz1PNFp6VkIpZU0kQjJkayoyVUVtUuKElmt4JTJYWj9VQGNAQyVqT1pOQ3VXZ2NyajBEMSYkYj0kVj9NXikrJE5HNiN3K25pKHRQOEVwOGpOcUYxQ2dtemk9dDUwKDNATjd2XythbibihJYoJispJUtuREhlaClraGlJWTlLMihrLStlRjd6MFI3VCgjVDlpYjQ1ZThaMiojPVNTZylYJlFWSjlEZGFuSjZDNDJLdlhXP3YmV1B2dkRDa3g5X2l4N28oU0pOVEpSeXZKYnkjK0h3ViZfdmlhUHMp",
									"recurrent": true,
									"verify": false
									}
							}
				}
			*/

			// save to db our newly received token
			return res;
		} catch (error) {
			// Need to be rewritten
			console.error(error);
		}
	}

	async getCardVerifyCode(token) {
		const headers = {
			Host: 'checkout.test.paycom.uz',
			'X-Auth': '100fe486b33784292111b7dc',
			'Cache-Control': 'no-cache',
		};

		const data = {
			id: 123,
			method: 'cards.get_verify_code',
			params: {
				token: 'NTg0YTg0ZDYyYWJiNWNhYTMxMDc5OTE0X1VnYU02ME92IUttWHVHRThJODRJNWE0Xl9EYUBPQCZjNSlPRlpLIWNWRz1PNFp6VkIpZU0kQjJkayoyVUVtUuKElmt4JTJYWj9VQGNAQyVqT1pOQ3VXZ2NyajBEMSYkYj0kVj9NXikrJE5HNiN3K25pKHRQOEVwOGpOcUYxQ2dtemk9dDUwKDNATjd2XythbibihJYoJispJUtuREhlaClraGlJWTlLMihrLStlRjd6MFI3VCgjVDlpYjQ1ZThaMiojPVNTZylYJlFWSjlEZGFuSjZDNDJLdlhXP3YmV1B2dkRDa3g5X2l4N28oU0pOVEpSeXZKYnkjK0h3ViZfdmlhUHMp',
			},
		};

		try {
			const res = await axios.post(this.url, data, { headers });
			/*
				{
						"jsonrpc": "2.0",
						"id": 123,
						"result": {
								"sent": true,
								"phone": "99890*****31",
								"wait": 60000
						}
				}

			*/
			return res;
		} catch (error) {
			// Need to be rewritten
			console.error(error);
		}
	}

	async verifyCard(code) {
		const headers = {
			Host: 'checkout.test.paycom.uz',
			'X-Auth': '100fe486b33784292111b7dc',
			'Cache-Control': 'no-cache',
		};

		const data = {
			id: 123,
			method: 'cards.verify',
			params: {
				token:
					this.token ||
					'NTg0YTg0ZDYyYWJiNWNhYTMxMDc5OTE0X1VnYU02ME92IUttWHVHRThJODRJNWE0Xl9EYUBPQCZjNSlPRlpLIWNWRz1PNFp6VkIpZU0kQjJkayoyVUVtUuKElmt4JTJYWj9VQGNAQyVqT1pOQ3VXZ2NyajBEMSYkYj0kVj9NXikrJE5HNiN3K25pKHRQOEVwOGpOcUYxQ2dtemk9dDUwKDNATjd2XythbibihJYoJispJUtuREhlaClraGlJWTlLMihrLStlRjd6MFI3VCgjVDlpYjQ1ZThaMiojPVNTZylYJlFWSjlEZGFuSjZDNDJLdlhXP3YmV1B2dkRDa3g5X2l4N28oU0pOVEpSeXZKYnkjK0h3ViZfdmlhUHMp',
				code: code || '666666',
			},
		};

		try {
			const res = await axios.post(this.url, data, { headers });
			/*
			{
				"jsonrpc": "2.0",
				"id": 123,
				"result": {
					"card": {
						"number": "860006******6311",
						"expire": "03/99",
						"token": "NTg0YTgxZWYyYWJiNWNhYTMxMDc5OTExXyVwOTY4TzI3MTJRQ28lWmsoREEyRClYOCtxZ18kVWRLRm0xP3FucVUzJChZazhFV3I1dmtrQiZUaFU5MzZRdSlGbUJPSEh2K1IoWU0lYSg3ZEYlK1QhTUV4P3pUU+KElkMkXjNuIUR6U19pdjY4b3Ffbkt3ajImZTRhZll0dUptNjBVMUF4KXJKJD0qTlNeQmJ5X2Q3bXZNRnZ2UXhfU25TS0dpcGc9V1doUEZxKSM5R0dJYjA9U2dGX2ReZ3lATeKElj9mZWZJS3MzKVp5MjFeOVY5cE8jZWh6cHZLeWZXKSF2PVBfVVU4ei1Gbj82JkI3YjhuRCFWa1omaDB4JEliQm8h",
						"recurrent": true,
						"verify": true
					}
				}
			}
			*/
			return res;
		} catch (error) {
			// Need to be rewritten
			console.error(error);
		}
	}

	async checkCard(token) {
		const headers = {
			Host: 'checkout.test.paycom.uz',
			'X-Auth': '100fe486b33784292111b7dc',
			'Cache-Control': 'no-cache',
		};
		const data = {
			id: 123,
			method: 'cards.check',
			params: {
				token:
					token ||
					'NTg1Yjc4OWMyYWJiNWNhYTMxMDc5YTE0X3hCJjc/M0NPejR4Jks5JmIxK2QkNCFHJXUqRyplIUB4MHpKVnUxOXZuRHVXK3h3XmVudS1hJFhON01ISSZBUV4jciQ4UD1YdFM4R0F0SmIkK3dfRlXihJYmI2F1MSpYNGNUVFViZkRtekZDNnU3XyElcERtdjRKXmtibWdFYjVpIVF0VW9NZWgzbyN5ZWhGRTdOQkBGU0JhS2ooR1dHZV5pWlJWZCVOekR2VHlJSmh5aSNxdVVXXnp2QUQmanVwb0AxbU1XcEMrcStPRUZQR1ZUTVllVTBeSGNEZkc/OD09JWleVEtqYUE4Y08rJloqVURLcG1rdiZEWCNJUk09dC1KKQ==',
			},
		};

		try {
			const res = await axios.post(this.url, data, { headers });
			/*
			{
					"jsonrpc": "2.0",
					"id": 123,
					"result": {
							"card": {
								"number": "860006******6311",
								"expire": "03/99",
									"token": "NTg1Yjc4OWMyYWJiNWNhYTMxMDc5YTE0X3hCJjc/M0NPejR4Jks5JmIxK2QkNCFHJXUqRyplIUB4MHpKVnUxOXZuRHVXK3h3XmVudS1hJFhON01ISSZBUV4jciQ4UD1YdFM4R0F0SmIkK3dfRlXihJYmI2F1MSpYNGNUVFViZkRtekZDNnU3XyElcERtdjRKXmtibWdFYjVpIVF0VW9NZWgzbyN5ZWhGRTdOQkBGU0JhS2ooR1dHZV5pWlJWZCVOekR2VHlJSmh5aSNxdVVXXnp2QUQmanVwb0AxbU1XcEMrcStPRUZQR1ZUTVllVTBeSGNEZkc/OD09JWleVEtqYUE4Y08rJloqVURLcG1rdiZEWCNJUk09dC1KKQ==",
									"recurrent": true,
									"verify": true
							}
					}
			}
			*/
		} catch (error) {
			// Need to be rewritten
			console.error(error);
		}
	}

	async removeCard(token) {
		const headers = {
			Host: 'checkout.test.paycom.uz',
			'X-Auth': '100fe486b33784292111b7dc',
			'Cache-Control': 'no-cache',
		};
		const data = {
			id: 123,
			method: 'cards.remove',
			params: {
				token:
					token ||
					'NTg1Yjc4OWMyYWJiNWNhYTMxMDc5YTE0X3hCJjc/M0NPejR4Jks5JmIxK2QkNCFHJXUqRyplIUB4MHpKVnUxOXZuRHVXK3h3XmVudS1hJFhON01ISSZBUV4jciQ4UD1YdFM4R0F0SmIkK3dfRlXihJYmI2F1MSpYNGNUVFViZkRtekZDNnU3XyElcERtdjRKXmtibWdFYjVpIVF0VW9NZWgzbyN5ZWhGRTdOQkBGU0JhS2ooR1dHZV5pWlJWZCVOekR2VHlJSmh5aSNxdVVXXnp2QUQmanVwb0AxbU1XcEMrcStPRUZQR1ZUTVllVTBeSGNEZkc/OD09JWleVEtqYUE4Y08rJloqVURLcG1rdiZEWCNJUk09dC1KKQ==',
			},
		};

		try {
			const res = await axios.post(this.url, data, { headers });
			/*
			{
					"jsonrpc": "2.0",
					"id": 123,
					"result": {
							"success": true
					}
			}
			*/
		} catch (error) {
			// Need to be rewritten
			console.error(error);
		}
	}
}
