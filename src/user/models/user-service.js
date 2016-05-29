const CURRENT_USER_ID = 'me';

export default class UserService {
    constructor(fetcher) {
        this._fetcher = fetcher;
    }

    get(id = CURRENT_USER_ID) {
        // return this._fetcher.fetch(`users/${id}`);
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve({
                    status: 200,
                    data: {
                        rating: 7777,
                        nickname: 'AZAZA',
                        countryId: '2',
                        photoUrl: 'https://placekitten.com/300/200'
                    }
                });
            }, 2000);
        });
    }

    save(user) {
        // return this._fetcher.fetch(`users/${CURRENT_USER_ID}`, {
        //     method: 'PUT',
        //     body: JSON.stringify(user)
        // });
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve({
                    status: 200,
                    data: Object.assign({rating: 7777}, user)
                });
                // resolve({
                //     status: 400,
                //     data: {nickname: 'azaza nick'}
                // });
            }, 2000);
        });
    }

    setPhoto(file) {
        // const formData = new FormData();
        // formData.append('file', file);
        // return this._fetcher.fetch(`users/${CURRENT_USER_ID}/photo`, {
        //     method: 'PUT',
        //     body: formData
        // });
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve({
                    status: 200,
                    data: {
                        url: 'https://placekitten.com/200/300'
                    }
                });
                // resolve({
                //     status: 400,
                //     data: {file: 'azaza photo'}
                // });
            }, 2000);
        });
    }
}
