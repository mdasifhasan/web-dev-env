'use strict';

const axios = jest.genMockFromModule('axios');

axios.get = jest.fn((url) => {
    console.log('URL:', url);
    if (url === '/api') {
        return Promise.resolve({
            data: 'test message'
        });
    }
});

//// example
// module.exports = {
//     get: jest.fn((url) => {
//         if (url === '/something') {
//             return Promise.resolve({
//                 data: 'data'
//             });
//         }
//     }),
//     post: jest.fn((url) => {
//         if (url === '/something') {
//             return Promise.resolve({
//                 data: 'data'
//             });
//         }
//         if (url === '/something2') {
//             return Promise.resolve({
//                 data: 'data2'
//             });
//         }
//     }),
//     create: jest.fn(function () {
//         return this;
//     })
// };

module.exports = axios;