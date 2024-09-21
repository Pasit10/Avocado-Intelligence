import constant from './constant';

const fetchData = async (query) => {
    const url = `${constant.BACKEND_URL}/${query}`;
    let result = null;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.status_en}`);
        }
        result = await response.json();
    } catch (error) {
        // mockup
        if (query === 'products') {
            result = [
                { "id": "00000001", "name": "Product A", "price": 100 },
                { "id": "00000002", "name": "Product B", "price": 150 },
                { "id": "00000003", "name": "Product C", "price": 200 },
                { "id": "00000004", "name": "Product D", "price": 250 },
                { "id": "00000005", "name": "Product E", "price": 300 },
                { "id": "00000006", "name": "Product F", "price": 350 },
                { "id": "00000007", "name": "Product G", "price": 400 },
                { "id": "00000008", "name": "Product H", "price": 450 },
                { "id": "00000009", "name": "Product I", "price": 500 },
                { "id": "00000010", "name": "Product J", "price": 550 }
            ];
        }
        else if (query === 'transactions') {
            result = [
                { "id": "00000001", "gender": "man", "age": 100, "ethnicity": "Thai" },
                { "id": "00000002", "gender": "woman", "age": 85, "ethnicity": "Asian" },
                { "id": "00000003", "gender": "man", "age": 42, "ethnicity": "Hispanic" },
                { "id": "00000004", "gender": "woman", "age": 29, "ethnicity": "Caucasian" },
                { "id": "00000005", "gender": "man", "age": 53, "ethnicity": "African" },
                { "id": "00000006", "gender": "woman", "age": 67, "ethnicity": "Middle Eastern" },
                { "id": "00000007", "gender": "man", "age": 38, "ethnicity": "Asian" },
                { "id": "00000008", "gender": "woman", "age": 45, "ethnicity": "Caucasian" },
                { "id": "00000009", "gender": "man", "age": 70, "ethnicity": "Hispanic" },
                { "id": "00000010", "gender": "woman", "age": 25, "ethnicity": "African" }
            ];
        }
        else if (query === 'products/id?00000001') {
            result = [
                {
                    "product_id": "00000001",
                    "name": "Product A",
                    "price": 100,
                    "customer_id": "00000001",
                    "gender": "man",
                    "age": 100,
                    "ethnicity": "Thai",
                    "date": "2023-08-01",
                    "detail": "This is mockup detail for product A.",
                },
                {
                    "product_id": "00000001",
                    "name": "Product A",
                    "price": 100,
                    "customer_id": "00000002",
                    "gender": "woman",
                    "age": 85,
                    "ethnicity": "Asian",
                    "date": "2023-08-01"
                },
                {
                    "product_id": "00000001",
                    "name": "Product A",
                    "price": 100,
                    "customer_id": "00000003",
                    "gender": "man",
                    "age": 42,
                    "ethnicity": "Hispanic",
                    "date": "2023-08-01"
                },
                {
                    "product_id": "00000001",
                    "name": "Product A",
                    "price": 100,
                    "customer_id": "00000004",
                    "gender": "woman",
                    "age": 29,
                    "ethnicity": "Caucasian",
                    "date": "2023-08-01"
                },
                {
                    "product_id": "00000001",
                    "name": "Product A",
                    "price": 100,
                    "customer_id": "00000005",
                    "gender": "man",
                    "age": 53,
                    "ethnicity": "African",
                    "date": "2023-08-02"
                },
                {
                    "product_id": "00000001",
                    "name": "Product A",
                    "price": 100,
                    "customer_id": "00000006",
                    "gender": "woman",
                    "age": 67,
                    "ethnicity": "Middle Eastern",
                    "date": "2023-08-02"
                },
                {
                    "product_id": "00000001",
                    "name": "Product A",
                    "price": 100,
                    "customer_id": "00000007",
                    "gender": "man",
                    "age": 38,
                    "ethnicity": "Asian",
                    "date": "2023-08-02"
                },
                {
                    "product_id": "00000001",
                    "name": "Product A",
                    "price": 100,
                    "customer_id": "00000008",
                    "gender": "woman",
                    "age": 45,
                    "ethnicity": "Caucasian",
                    "date": "2023-08-02"
                },
                {
                    "product_id": "00000001",
                    "name": "Product A",
                    "price": 100,
                    "customer_id": "00000009",
                    "gender": "man",
                    "age": 70,
                    "ethnicity": "Hispanic",
                    "date": "2023-08-03"
                },
                {
                    "product_id": "00000001",
                    "name": "Product A",
                    "price": 100,
                    "customer_id": "00000010",
                    "gender": "woman",
                    "age": 25,
                    "ethnicity": "African",
                    "date": "2023-08-03"
                },
                {
                    "product_id": "00000001",
                    "name": "Product A",
                    "price": 100,
                    "customer_id": "00000001",
                    "gender": "man",
                    "age": 100,
                    "ethnicity": "Thai",
                    "date": "2023-08-03"
                },
                {
                    "product_id": "00000001",
                    "name": "Product A",
                    "price": 100,
                    "customer_id": "00000002",
                    "gender": "woman",
                    "age": 85,
                    "ethnicity": "Asian",
                    "date": "2023-08-03"
                },
                {
                    "product_id": "00000001",
                    "name": "Product A",
                    "price": 100,
                    "customer_id": "00000003",
                    "gender": "man",
                    "age": 42,
                    "ethnicity": "Hispanic",
                    "date": "2023-08-04"
                },
                {
                    "product_id": "00000001",
                    "name": "Product A",
                    "price": 100,
                    "customer_id": "00000004",
                    "gender": "woman",
                    "age": 29,
                    "ethnicity": "Caucasian",
                    "date": "2023-08-04"
                },
                {
                    "product_id": "00000001",
                    "name": "Product A",
                    "price": 100,
                    "customer_id": "00000005",
                    "gender": "man",
                    "age": 53,
                    "ethnicity": "African",
                    "date": "2023-08-04"
                },
                {
                    "product_id": "00000001",
                    "name": "Product A",
                    "price": 100,
                    "customer_id": "00000006",
                    "gender": "woman",
                    "age": 67,
                    "ethnicity": "Middle Eastern",
                    "date": "2023-08-04"
                },
                {
                    "product_id": "00000001",
                    "name": "Product A",
                    "price": 100,
                    "customer_id": "00000007",
                    "gender": "man",
                    "age": 38,
                    "ethnicity": "Asian",
                    "date": "2023-08-05"
                },
                {
                    "product_id": "00000001",
                    "name": "Product A",
                    "price": 100,
                    "customer_id": "00000008",
                    "gender": "woman",
                    "age": 45,
                    "ethnicity": "Caucasian",
                    "date": "2023-08-05"
                },
                {
                    "product_id": "00000001",
                    "name": "Product A",
                    "price": 100,
                    "customer_id": "00000009",
                    "gender": "man",
                    "age": 70,
                    "ethnicity": "Hispanic",
                    "date": "2023-08-05"
                },
                {
                    "product_id": "00000001",
                    "name": "Product A",
                    "price": 100,
                    "customer_id": "00000010",
                    "gender": "woman",
                    "age": 25,
                    "ethnicity": "African",
                    "date": "2023-08-05"
                },
                {
                    "product_id": "00000001",
                    "name": "Product A",
                    "price": 100,
                    "customer_id": "00000010",
                    "gender": "woman",
                    "age": 25,
                    "ethnicity": "African",
                    "date": "2023-08-06"
                },
            ]
        }
        else if (query === 'transactions/id?00000001') {
            result = [
                {
                    "transaction_id": "000000001",
                    "gender": "man",
                    "age": "25",
                    "ethnicity": "thai",
                    "id": "00000003",
                    "name": "Product C",
                    "price": "200",
                    "quantity": '1',
                    "date": "2023-08-06"
                },
                {
                    "transaction_id": "000000001",
                    "gender": "man",
                    "age": "25",
                    "ethnicity": "thai",
                    "id": "00000006",
                    "name": "Product F",
                    "price": "350",
                    "quantity": '1',
                    "date": "2023-08-06"
                },
                {
                    "transaction_id": "000000001",
                    "gender": "man",
                    "age": "25",
                    "ethnicity": "thai",
                    "id": "00000001",
                    "name": "Product A",
                    "price": "100",
                    "quantity": '2',
                    "date": "2023-08-06"
                },
                {
                    "transaction_id": "000000001",
                    "gender": "man",
                    "age": "25",
                    "ethnicity": "thai",
                    "id": "00000009",
                    "name": "Product I",
                    "price": "500",
                    "quantity": '5',
                    "date": "2023-08-06"
                },
                {
                    "transaction_id": "000000001",
                    "gender": "man",
                    "age": "25",
                    "ethnicity": "thai",
                    "id": "00000005",
                    "name": "Product E",
                    "price": "300",
                    "quantity": '2',
                    "date": "2023-08-06"
                }
            ]
        }
        else {
            result = [];
        }
    }

    return result;
};

const fetchImg = async (query) => {
    const url = `${constant.BACKEND_URL}/${query}`;
    let result = null;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.status_en}`);
        }
        const blob = response.blob();
        result = URL.createObjectURL(blob);
    } catch (error) {
        let byteCharacters = null;
        let type = '';
        if (query.split("?")[0] === 'products/image/id') {
            type = 'application/octet-stream';
            byteCharacters = atob("AAAAHGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZgAAA25tZXRhAAAAAAAAACFoZGxyAAAAAAAAAABwaWN0AAAAAAAAAAAAAAAAAAAAAA5waXRtAAAAAAABAAAARmlsb2MAAAAAREAAAwACAAAAAAOSAAEAAAAAAAACmwABAAAAAAYtAAEAAAAAAAAiwQADAAAAACjuAAEAAAAAAAAAvgAAAE1paW5mAAAAAAADAAAAFWluZmUCAAAAAAEAAGF2MDEAAAAAFWluZmUCAAAAAAIAAGF2MDEAAAAAFWluZmUCAAABAAMAAEV4aWYAAAACeGlwcnAAAAJSaXBjbwAAAbRjb2xycklDQwAAAahsY21zAhAAAG1udHJSR0IgWFlaIAfcAAEAGQADACkAOWFjc3BBUFBMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD21gABAAAAANMtbGNtcwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACWRlc2MAAADwAAAAX2NwcnQAAAFMAAAADHd0cHQAAAFYAAAAFHJYWVoAAAFsAAAAFGdYWVoAAAGAAAAAFGJYWVoAAAGUAAAAFHJUUkMAAAEMAAAAQGdUUkMAAAEMAAAAQGJUUkMAAAEMAAAAQGRlc2MAAAAAAAAABWMyY2kAAAAAAAAAAAAAAABjdXJ2AAAAAAAAABoAAADLAckDYwWSCGsL9hA/FVEbNCHxKZAyGDuSRgVRd13ta3B6BYmxmnysab9908PpMP//dGV4dAAAAABDQzAAWFlaIAAAAAAAAPbWAAEAAAAA0y1YWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts8AAAAMYXYxQ4EAHAAAAAAUaXNwZQAAAAAAAAEsAAABLAAAAA5waXhpAAAAAAEIAAAAOGF1eEMAAAAAdXJuOm1wZWc6bXBlZ0I6Y2ljcDpzeXN0ZW1zOmF1eGlsaWFyeTphbHBoYQAAAAAMYXYxQ4EADAAAAAAUaXNwZQAAAAAAAAEsAAABLAAAABBwaXhpAAAAAAMICAgAAAAeaXBtYQAAAAAAAAACAAEEAYYHCAACBIIDBIUAAAAoaXJlZgAAAAAAAAAOYXV4bAACAAEAAQAAAA5jZHNjAAMAAQABAAAmIm1kYXQSAAoGGCIlcrZVMo4FELACEEQAQegRvG7iZRsSxCTWp4m7J13y3jxHtZtkOCeYb1zL0f2ESeKjP8Yzsm8AIYORuJc6qkY/aEpdkHEHKgjvhh80YRozut6DWLO8YMURy2wF8NdE04cXgw9W9zsHFYA9SYbJVUC8j27YQyNDQEzoCyYJULU8Srjroy7NxsVh78cvxCRRbnTMNFgu2h0Yyxg9WP4+n0EN73YjcTl1UnALwZqUIRUiNSwNOUAZ1JjQNl2YIiH7Xlw8hUIGSrY/uRXOV8/aLHbw5JS/mi2nYV9l7x88RyK0GTRr7NdkbNJ96HW8XF1Hwk+717rl2mpb7g72IRjMcW2FgEq+SwtwP/oiARoB7CoD8ZU2UNf5G/b1EigzDTHD6O/DCxrLjeFM4sZK338nsLdrd/EOK3l3k2bTipNzTWxtB11sxsQ/GSt+z8S2UjQqzZqFsB92JFFGyr8Jmp/9MjKGMpPc66or+iWlk9FgPKZKWGoljj3EnXn1St/S9ML/SLSGxfhiEXS9pNzmWo+mu5No4aqkQt2zvYel23Y1JSsaolhLN2vu+pfDkB28qFGjx4j+orhN8cEJhoyOo1V6SESIYAdUVWiVAk1hfHXqveSWoLqAt78FdfdjTVgx8bp79qQVrtd2R3je0kNEAZgYhQ2JZ/zHTJ+EcqsTCzmNhM2dJVVAVgenYVnT4Q7IXiXNcszskqKjpMC/gA4Z2slwslv1UVInseYTCSynNqnV6WZjILkMcISohTx9oFukHDX7HRKkO6LBqlrIMYXGIBAdtHyML9WXMpzdJJBVxFwVNrv5P1XBSNqL5iu5t5xhqqOPjHb9yJUWihZybRGjg1lMST9GawhBgt/MIzKncMl71+DgXiewzsGwEgAKChgiJXK2SAhoNCAysEUQsAFCEFEZIIm314MdlQxblLdchkDyEULc6WWdDsUZrVv6uucRPIqiTR/brNllwtORZ6mXaWnvuS0KPzmszz3+wMf/Fxh1pNhqIsz5yjIrqbgxCeZkciupqWrT03XhWgCJf5t4zQoYWfKcCB7GPbDZJhmWM2pCOB+ZVdTI4EC+0aQbSL/ur+JhJlg110InBZKzBjpyF3HT+0Fr86JO7XAoihcI/4cFVn5wlzS/x/BCtio0K6wIMl0WEEKwZ9oOWA0jqwjXWGurYiR0kmxsbUC5x2BY2MGPhY+WmftcYVkWb9Df0Luz+GTZ6cyjXG34VXc7MbDkSheR3XBwTYmpoM0Ubtp0PGGv1u2+hHpF3zl22P/Phx0JJ3hPRXvA+ez18jOagp3i4xaMzeDGIsReLX5iuHhQkTAkbcoERUxW0NS8gkwzQxoR47JlW1lzW0ts/n1wt4AoaKhCgHFnoKdlm8lzs9jPMW/fhmj4T88i9CMnGHM7D94P441d3bB23KQv+OdorWVm7bD7AG2Gm4FUsq+D5VUlkU30HffI+dYX65g9HhIMZ4zrT9ev9l5ppmK9e13SgMW7IFGuM3N/jgFWme0ABGcU/Yjbyj6UtsRBP1wnYDPD8Wy5fW6dAv1rqhpa5fiiOsTl/wWf5IMB3jQTf1XQF+1VvJB6OBEh+2IQfs2CbGyq1nZ058GJ0Dm8O7LHp0iq4E4wbutZnEVxipTGFl7uGAiIHoGpM+rt+fHInqBmcLEp9uW4ISC3nVa+MmngrEWA3ZAK17hRKJ+xvpIsAkTh46XZn6RXastSOL41/n5iubD78Ay5+8Cy7/1cZ8V/9RCBDlnrE4acqRF++BsJZr2JBZ/CTzNAT5k/Puuvr+dwGfqj1rpmS2Ok0BElrCIRokA8GKksmM+K2K1s6RktQZwmYDyqZIecHK/X///v/DKUU60LndFToC543UTkKU/lHYNPNtHxhJQxFRNh2sVF+IZnvK0efmaBodhDGKyBzrawUF+KSw/o6Cl3ZDQWQR0TX/gMgOgSYGe7IX489zfHf+lvmc9C8aF5gQCmGtnBBbm5V6RW9iGc1TVp+pBm35DBjzW/PagpfbczonWCV+Px+zc3sY1ZdReMXM6z1YYWMfDk7qf/s0RtBMs9gNoR5sDI/nc2+eYkiI2Q9yR2zRtynIA07VTrBNijoiO6ZbeX+JI3rReVLDtpTt7R0YOnnnfWE6G+J+stPY6nMdUMJpdXvDoFO+G8mp+koqabHzfgsk3/TQvvnYPN9VHvxBYdPtemcOwazFvngl1KmU+cIEYoJMVKDO3L5+EJmAsrSL9ZMYMMEWSDkz+SGa4IlH80/nVpSR3OfYY/GrJIeFjTFiCBm6xQDbvjiAO17weQ5K8p8o42tTYPTbtwyMUlbUllaRlkJdlZ6zilC0s2i3hKxK6jIxxUK1tN3uFFdGKjwrm7PMy9s66yMVawm7b75MRIEUWVs1SNf6rhwA/phyHHDazzNLoW+kppP/+B/PxeyC4HYHzmxXh/jQR/gmqrY5HjHjQiSDGQletlgkPsbryDxXTuU13nDI2zSRQmcLnvStqc8EPQ/Rxkw1qb0WVaTVdVVUWnD6EzRG5b8ytSWKL7Bye9myxv/iOEViCM+4TMWzQWsPUy1kiosK8eNJ3TOGvJCqghG9zJyUCeuWxvzLK+7fF0Ejttx3pQO2JEB6wy2aAsW70O3fj8iale1R4Elq4JCeVrV0pEnQHOVGvATLAsZIsSui2HgGs7oF0Sa1eqEizcN8JbakDHd7mAR5buOwk4ZghCOkpCfOS14Nx/bi6gWXNjnuk4+67FKF2Tpms0ZYm4QoVdhbSRlaTb1dUkCHL4Y7LuhxXGfI/Wtl6t7a2i9BQWnlKgiroMV2wkWLsM4WfKSGL2rHCSLokb4ebaOnVgMyt8mSMbEaxvtuOQ7d+6qU6PMrAJvA+Eha1CXWNAF9O2Dcy8vaVvwiKd+y2eGdoTYTiB+4M8Ay6ymKZ9pvH7crhlYU4opZEracja4to3JC4cGDQe4H4XNCAXZrvCSVxb7MfCKXkit9WqJM388Wo/tiZtRuURfEGiQ2G41o2E5HUb4dz5gQA8OqRd6oSN1rDNEQunDjSrnCw0gqfCztD4HEsGEtuzlROHGkwJs3e2fGVieZzpD8s2udcGe0IRs//btu04iuAQPWuVgS0jaQG/UBETuzx6YIBG7nhfXkiHgkctBfSJWhi11gV+v1l1vPPHmqDdLhFeMz8na2+23UFBTSonGdaGtEZsTO/0fNiL0IQUFmC8DJehi6shdnwfozgWNVUaabJFGFmlxQmkr9OUkTRWurcA5/md04Ns3kpoSp2xErKhPxgf082sHOPvOFQrUpeeLP+FNuUPZ5LfcS2GKw9rk99yxpCDqoxFV5Z28nGUEns04qs8yKfRTjRrwaLM1FDM7jDywltufmPj5dH4+wGU7yqnIpjJDPkGnOVIPhlJ1MqPOBM/UrZ2uEbb0IfxNG4pkB1NZFK9N4CtsGROGB0AaYpb5xNM8GyPyILMsaPt8xZGMDXzNx90vTQPhINx1OWd8VwEnKwI4/pQ289Pc+XBy8dGfIe+qcfKcWRy6EDdb4gcwLe1ORPwMuyg+HfpPeKs+vSw92rSUPglVNvrpGfWpgIz/vEQEsxTESY8xU+yAbRMJEBQniypV+zW9z87EkZpS6NGZ1/NRn4YRQIuWPMlu9B2OzCzKyWkB1R+XJwqJQ0dnwk4Beix9MCVmo4vo91kzPRvRbyqd5QCIVWAcD6cxuD1o85dwSW4StA2SXdjPYTUaBAIGsx9cX8G3R4Z+RdUQ7oiqmSV9RBAdgZDtKLzXwKf5xKlctgvKKdVMGWrjBnbnat3LYTbbMGma0u/+RHPBG24+wqqK5IC2EPOnuW2Ayd7SttLgRwplwfnt85S3yiMqfEjTyajS12nAzyESbiYqVslOJASaM+0pWVcSvePBKbdMzOgdgpDjyYxXekHVDSrYl2SfhXm4kYHi0XICBJUcFk6apYZDKR06OF9/rNlx3zL1F1xlwj5yrVwVOj4dA7edAz0e+uPDNFVNcVHlC1D8XgC2gRhB9cwfC2E2xfgeCmAiewUyP/Ftk2uUSfMZjBla0CSdeprYwcGyxFXwYXnDknIj1jzxm/Vz49Yg4BYkxSyP1BSt/EGId5E9ltrHPegUJO1DCp/80wQXu9de4avR5S8MJ81mopI4AQxTUJC71qOiQg5JUJN7LXpl05GQiUk1sxWB9ea8mF0C7lYcHyp7H/yC8gFcP4vnBtr4j19jDtNYcLKAl4149aEdjrKUfLespzjUwea9HMJCIEkF+ceEd9nijaZAiD3Zo5Amq6QCYbKf3xkOhaF0PSczfQyDlTV2us4w/JtB4tXwKswGv4ei/pgUkxYSRHZkl1aJJb8FKqdX9xqtqlUPp3/p5QCNkOTVjsLjYlsXg6B8yCpLGNtXl2z/6G5ffBY5BjCZJM3yIl6krcR3xea2egYOHQRGgu8Ux4ejCAVUrBzDfzK7wYew8WZbxhMGRAKwiYHWcJ+PeJ4tUBKYkaEdteOXRhktyrmMq9fyCIohrkgPA3uUz95Z+HKmdkndFPllloLSIa3+k1gELFHU2FiFg4R4eqHzTNt5nAnOcX5RkkEx3ghDrtFh7/sLKAZ9YIg9825xIJXuk72FicaYpq/DW4eHwgDQCqkTvh9hJ/maOqgtdD796FtUNPnwkEWT3g2mgH0HZ2JCZmTwfrPm/VinuZ6l9rWcGoJm7aX3pMKWJYMUhWRphWx0wADtVUipA2wLglbIu3e2fmqgtf9zThjFgHZt8A4haKibcVbXUZv+yO9uMkPU2jZwaGSZ0TbYrPBdo7b1A5yDQywtjUX8OnKzR5siJflvRUUikQrI2OZTT2aqUd3FfbnIzVxi2Fl8L5rnVx3ouFvPxIZPeI8nbzP1GjsrBdQgXTKg3hrjIx089xQPwe0jq5dYGSY/SEQOhgiYyN5ufPUTFfmwZXWnagHMVPNrwSz2S8gFI7uIIyYro/g92e/r6Ui5Oou12VyVFpSycs5sVnKbRXG7B+XBEhz6k6f1MO32StlyWLia672CRN1Vk47FWXxJ2SKfvqENVbKt6P6KeoWnMiENP5rrSCpU7ElisJdM3Tbm2MrUJkCKHlxrafPto9EU7M7nTwWNudUCzFV7z3zRGQEbws4sVseAiEJ64zuPXq8hWPsd3oDJbdVa5gGgslghSimcR7y1GKG3HB6nBjAthj6H3QP4JN69xfLbpXr5oPm9St2WKLbmWm2yDkrxsZZm8yg6MHskfMAjOaIQi15+fMxIdNMUrC8WgkJZNnNSQUiNmls49LckfuVYKHQGEaUGzPxnEhsYRCOenT4EEaM7ivhNJURrKZq/FcDXg33HtHzMfAmYLSCAE2U3i8fd5dEoQsaS1qrq7Myo3eO8l/QU8KNd39yCCq+Prtvw1SiM0jtGOMpuvfxR0/vmLwSmIeGEdKJ8dvxgbrOr+1nslA7aE2aj5tJA2i4+jIVzNajg88GLRwUg+U1EiO3x23uIIFGIsnQ5Ti7IdjDq8uMbeSZXZsIXZ5VkktO2Ln6I7dFR5ljXQOyCfCknWuSUxA67toNkhXNetEgN2y16xMukGN6++n/DPMa1m1l/7NtVehg1rC+Leu/KUNtQiAVV0RGdudo10FSewOvWfuKnZN0Qazro3tsiH2DG6eHWohkzktw0S+eKsAK9nsg7mApT6RH8brJLqpISMFyb/AohM/V4jGsOtAPHPK0FN/qr1jnhRsWrvi2DB9eHDKvOMLPZ1wGN/o6DrVAHWRxjZmnnQAft8zuoxc6itVfG1gb8X+/48Gs8v1m09RxEUL+oHLgHdnDfqWVgSp5DLhl4LVHcDOh3QmonprTsZi3DuTt+Tz43YKACNEPCnkg02smeAsEnmL4wFnwmkpiekp2unmkdb7snPxRi7r2vkVoBoxtJa+WRuTeRFmmf6l1IH4aaRaEvua3hutHcAn5FcNsEHq18gqAzsXBGDd9LUDXEAzrPWX1hj9AYh/L9Bw7QscQb9+P1PD9yqtT0dLDMfJVjfn4UN8rlEqqLk4ZWHYEjzVtAmK387MYYvFU39QMiqrbpHtzLn3AU+djut+WpZiV2xPol1Xi1ga6RvRhq4nkOvwi6lHRD0uWL5B/1MvcSU0IG/8tWuelq8e61cG6wfovWxNFMRE45SPC+avnYN8P+xQX/Wd0Yb1F5nIE2pwHHgFTdpdLOXD9bDxH0AHfVja7G/ddsJzfPBjLgLow1CaKPiQIppXhJTl1V3WfNae9ZywXquUMQywHxkhRliIXv/ew+t1pz1jblf5QOcujuHISjusCgz3wpTy6LoeJ4Kxq2i4ofQGPvrdrKJG2zvd/Re9xLBUZ/Qb0R1zAkRP7oJRjB2sdI3knWldLrSMuHXHULaWmSBFACZqExG33tEF4pnIFO5Rb9SLsNrX6rrwHS/q66NJH8DwgVi/B09eRa1gydMwAx9m3m6VGwrW/sZrVM6vFbZlkDxtBMDOilLmpjZKOMgbyWatetu4k0L5R8YjzUmPq0LB9uiTZNJkyHsG1bM227MZtcNJJ0JGT9B71iuAqJouPL8eVubEhtbZdA/qzIoYaEuK8Jn4B9uR9P9LvI7TqepYvlqR6sAhM3ONwrBvPJ/OnVW17cXQcF04cli+5IeWlhBqEv647WJlU4Tnip5Vfu9z/32u4eL4XRfm3Q6Ps+hopaGb4f48rVvhHmscA0vs1b+b6Xi5IenDNji6FvG65YkaOwv0yA9U0LvCSXE2mY7SUsVjBM2uPeRmyfQS3J3h7KooRkKubQrK2tIe7VVBrEnCG7fNFsya2nQTLrNaLZBy/T/L84NpZVvxBBTk5IPDxUNT+Hc84pgRsrIwzeyYaoaMoQHVVgktGoHApb3pCT8dC43QPHDz1F6ukOhYXa+EPNCBCAV8t73q6qbTTAElk8mHGVPeIBnFTCRN/Hz3c83GB7bzL8U3/dkqiC3/TrE1G9F5JzHuK173vdEGroSBgSCpSH99kBeZraG+sqGzBa1cQP0NmxZFtW63qiawnaxFBRUdOdbb1f25ik/s69jpZSC968QDrzNVtRUShQSnzVWvG0/hm17rYTmueql5vUczt/16pNjgGRapNgmbc+KdjRELRn3DG2B0p4NPtHHazNFZg074hQgPioHYoz4B+L2/9WCdYtBOvmTc6SGDDLTABiCvmriN7kioXSHA4zckOFscij/qqtSg0D5vy0WTiFMTdoVZWNT0sPWcoN1yMS74/CUnc5dMi2a9PgtSQ3hb/Qq6vykQVO6/XKjB4HeC9QY+mDfOLLPvH9v7Wsv5W2AT0p0pwiI/+YywgyIRgW6PZcq7KNPbnMFfxniWGO3/DXxiyw2hEJ+nlT3S0znHmuEUcozk04tb+XcgUNe89o57HhJIH200QowQ/6FKdX94vkUyBYg2FfRfl3qM+eckoZBonm2G7K66WkTpyJtbNSSIznn+O3qcW7Bp4ZpqrCPU6PWmLvjarVWBkamCd+YE/GNVDUfZUBrW/vHCoRyU1rkKMevMMLmuWSGH5z/lSOSy30vsHH2bkjTB19VdjkIZUhjVhD8S3XdylgCjzpnlZe7XhvS//U2hrAF8tS7FPYyYAEhjWtXFhu17s6tJu0fbabI+5nOHAGGrGc9oOIZY62Dt0C1i8BUvj6uBz92qZbBsVtaTYp3+p6vnd8zawLIRc6WM1O/+eSFL1WcDuXtZAjAzilCBWhXlNDY5nfWXMuWU76QlDTyZhAvRWK81E/PsDoJG/t1zNp9aO9wrxLGUj9JxWdz0pwpysvZo287Ao0+eoxXgfmbJrmkvClEc1X7Va0d7LVoJv8qFyyCADO5mTemnXcVOyzh08sADHCUoW6tZnzs37YuLN2CC3DiyTeacrCvWXLzYdWn+7+cPHRbu5T3ijaYBWqTYWFP9czISqsxXFn45AOWvy/fNQvlxjw7oZsHkXSuor7q2xBATXLyVkpb4F1F5LTUzG/ihXxxw+HngQXyljdCeLkNY5aucOMU2Vq9QNk1n2E+5/BUePjMXU4atv6jxTI8WA829zqSrwy+wWPFZLtQWzcvRDekUAxXkMZVP74Xm0UYYAHI+c0Yxu1IJPpZJUNSqZeJ35TngFLfHDMT0ArtsZKzGEv33mZ5IW+BIyJ/cKHTS+sbeZu0R9aIeQBFgXA5Wl6JKdsiwpRK5BNjNRVu41/LXyaIMqM4IuXA8ivyG99LvIHO9Ron/tWnsolAfvLBlLySpf/ww9N8unEVHP82SqlIEONtlWxyVpBC6oyMwXsu/SKTjRBnJhpiQsmREPmwOqg25GhdSa3rhgs3TPXZHLeA+ETAz6C5DKymFQEOed8JP/P2gqtpIZOYIsHyu8jqfiAjM3uwqAAvpcsG02WWq78jeuyVuP0Ou0wkP4ymDPX7CIloJTp5yBMb/vrgO67yA1xH0kVtog3C/QPPjgPrDGJ6UIItlwF0s7d0IoqSzYwLGFtPqiuCVa4ELke0t4fY75xBPYI4dHlFNl9Ox7+YwnYMd03qcbhAv/zZWIhoVaeG0OxFG3lmE/hkya4OwG33CvmAADeD4gm4c8Up0BdrRhSov38/Rj3r9qc/yymUnR7lxvhZHVx5kJvuGLnPOpLFRwNeLmGH+awagnh3q4alDZYcTTjBDmqfxVA9czu6pjipjw/mlMPZbO+NI8TzfyIBRWoFmUjvUfcej9KUWA9TXhLVFqJG37gEivJreols9lN/QY5i0roarQRhwcLIgyuEZKWUSS7KLx3Z0h9Lf5fYCnUqnTj0rv71IAPMVA6xS2Syg9nFFSMp/Y6m/4kha01ekUBMlVkbjD0BQVL2TdUfbEv0s2wyedyj5LOPBi/Twi+Xrz1PKBaG8xDb0LwcUxubyRyhYvhw351/P3LIZOG9Mq4v/PKO6+LTsnlOPpc5ANwM7gQS4L84Gg4+U8sulUA1W107dz5mMoFMwXRyyowPqPiEj/+2bxd23wICzQAGxWYnIHpQNDzAAAABqFYWyMgeBwwJSQZN2aB14Y0yGvwJuVdOkPDdbre1NVoJdiIYXjV5NcxYQhtwqx7v8TigrZ4qis9SxEBcv3n1spg+oKBdy3RXgANZcHPUckegAFDrypByBd30aub3hDBbHeKpGTM0nk3GxTJAmir653L8SeRGJFUnTBGl8NI+arL3Z1qo1RdBY1rpP98T09RWo/m08eCflGIsdOq/hTDkUseXYemIK7dWGiwULE5JBaa+BLciPUVJZOMO4425PeeL4VJuys6EofWLehdtfAq+AeHXEzomd1CtsTMyL7cjbx7JVMXebFr8evXkaI6kP81teyOuJfEUkWvjOoWnRlyn6RVCLEjLRsT54KEJU+bD29H064L4xf5i19SLAqVVYpLZAXj519u1xnkhz2ubk3DryxFg157THu9wAgm7D6ZiYppIXvUu3Got4qhbjyF2dB7eNWm37GkVQIdgFhD6BMBheEqlrRzOu+pRfz6sq6jagiUagR4p5X7bR94r8sjnsofZbaSwEfpE43DUZOsTXDmFjEX/7IzULRRM8F1SE+gIQ+N3/Dzu7bCWf5flMhJgMO+0/6ugXy77IibzRgdJg8FnjtfD0+eaFsAnkESL5V+zLfxW55DumpAoAM7WFYwTcGkJTXOrIuQRQZrAFn5bBxI/Glpy6W+GXmYBf+SrYFbkpTcNqbPH7SWqWVi1k3HHqrgkjM435Xygjd0t8tZY7FVVqRl/QWD/KsaEFAIYlFbIJAmkTYdvYsW+i+uZVo9DFls0WyrBbYFuYYco4dNZc6Dvo9VOzp48tyJf6dNMs/CfB5iCH/lRurXCohEXQROWkXgDmHreYOuXFjErMl5jpDgtwL/oF5kJJlTb9o+2qAO8tlVfFArTEGX1RuFxv/fnkuXd3tjvXbdPSJJbQc27dJ/8XtGvMAwu8bPeQr4ytsxow727lEVGhr92dRry5JupkSCs60sw0gpf5COTHercMlqCgTH3041oojcX7H1cbhYsPxhpQUs1C2+yF2cvbEG2Y4Y4+bmTqTVJUH9INNSzzRWveY9oNhMAMWhXGfCW1KoltTuCvjHakZDVS9gdHcRh887rB7OrCudHrOHnCi/LgOsP1iliAbRRAP8N62zgPYGljTBSvJ5iBxCF7xpJiEcypQ9L5NtAy9mk2VigjUGexH9Tcx8Bi0sf126PLuQpXNxwWXxlKLpqj2knbR2dnfeSca5tlG2Wt54iaxJ4Uguxw+nS50IDWYFn62Z7Qv5yavWXg0sCaonYbe3Gjpl70X2L8a/EG13QoNo4tWYQ8x8pTgQThIdpPUn+6cppT9nui4KR+nirT7XlFgQPT0JXPFUJV14K0Os+MuRpJQPapyhSbyn+jamDelnhJD00kr+szLTcrN7LZJ5YRs2oVbk6ZVKAlBpeazES0jM+RmMBl9i/UMr8RzlfZO5XEt4QO1/hx8Yd4YAPCISBLa0WlwbZkAL729ZSbcxHFQb4MtHpqsnhKtmpIrBevQK/isWBz7GdhCvq6oSe5Fh30P74iHFQzHDrDjaoztgDvi4qXi03ImXbCcZIcRM7zlb990gnQEt/RiwxgIF3gHp8DkHPkZI0KGb7zmI/TJvU0Ii3T89/Cc84nrKWOTlCG9m4j4aBGLYa6ihBQ6WNL9BtxOgeYDhXg6Hoo8cp+mXrv/XTDsNC0eAIg3KVO0vu35WU1YYbCUtxYvyQdgfLioYJfc9JrfgUJwtccAC98zHmr9d75WP/NCIy/7eXQ4JtRFLffJqcwegeVtedfKErXKMbXN3KAbna4s2gt/Zm8X6KR+zPLqzXJV6+HEQ51bDYxw52rwnf3qZCAR+roV1cPqa8SUgsGyn8LqQxbYY89q5nhL2+48PC8MF3A3ip/8bQs2fJ2Q3MsLPQ/B/zbaYuyWmLljg9TGisxFL0cOZSqGmOcwy1WN6ro7tLf322VMB1acV1kFXXAC3/709BWRl5Y7S7P07faxwzNtWaYsM1QmnSHaPbXCnDkpg7mAGa7jyVqPVbm8+1+WWzKkZ4s7gFdhbRGmiYfmx6dur5MLrgaL7b09SWpUN1k3j0jkJX/jiKWVjjDCw15BuSm5tN8oX8cGjRxIU95ybFIGWd2S+K5zN1TmKkYcXpgH6/nqLInFA7YFZa+asK5LgnF7PW8r3WtGHetMWMKR8y0eMW0JZ7LOiiT8e/u4Fs1bpwmpnaCrKePel/vH5Hfoh/yVboNyeeHenkpAGK0SMamq7gS/RJk7KBofKDV24Nvt4Y1t3SGN42Dav1wTXlb+XHi6YZOEDrh61IasgrIHP634giDZfmPPhxpE8CI/RoYV43BygRtE4cIBa/m94kxnpf1IOgawGLj3ELuXeIOsEvsbnjiMibz+0XvGRHRljjBWraZLti5/NR+1EA0itF9gnLPOaXmMH+3tJ4/SVr6PhiPH5DFyfwqIRcr7wUmo8nXFyrE1EXDW7eieiB6Vy8ii+BsSJKOQxQhAIVZKsLMdBNTHJyDxukHAr2DC175HXEcZeQ6ESn+HgGWJKHjAdimoWJ3+B0covxvznSc+Ht6ZzDvECJ2dyiPZ/KnAkLa+u7QEncXKPVVZOSTkqYpdlmndiWnLDeHyOjsMs3sX0DXDuoSFO+L3F0SoXpvaGNVMZou0XxUeftx4oIbEMTDzvMHotDmlEOCMYNUMbhwT0371mAK1JAQXt8KS/i7795Dx8bUq94W7NzzYjEOu+xsv5Vf5ahhQ0aajH28QYt/HxR758oqg5L76JORlENuI4OAMm5hUc5829jTnAjQ9sS/GMFuZIKLXuVN66hReenmouNOZjQzIAxyakjHN9PnNMwE47OGu9ESDX6J2BbVqr05Qhfwkqx7PKhUkZNn71VNeGcK5f0EiY/MPi//1cn6Fb8YtJYdkxfvUB3PSpiugLQlQhLMzyHVjw6MXXPMRmMSTr/cBkbbNjp2AL08xPX0TuKrZ6DQgbsAJDUTLEKI26wrk2PoA3QPWpAe40FSgs711qTkQzaOTm1d4tQ6pPuH9gPxwjpEGMAUOsvCbMwE3UyuhlYcDzxSkHfDY3JDDQnZmE5HiGRkco78RgGQc0qJoKiS3rs3zjwkpqfaLqLA6+PV62HNfLtEuwSB1KJwEyRJ2qAeZSXN1N+hlM8ar+xtHy0+/uIBcFi4yLuq3YMVDtWjD9ApGZ1qWAcKheeeOje8zt7LCoiEyGklNtaQzQu6CBivFjujAttmVx1AfYwc6FifLWMxNrVX2xqhuuni4PmgXZkDxVjx6DjP2vhqNNhIg9vDSJSHOiAlMVIZ6PJU8FZO0DmSLACRhSwlp3mjkZEMJ5p5QVVg8mA2Cz1rQ6eMYK8BTTV9h5qreK446mCYhI3MS8ln0Q3MO8musR5eV7AA3zS5aGKz1YTIWF9qaORZVF10djZu9XMByLNvUoMtZW/4L/Q/SgVuv8EsyKhUcw3uVSdvjC4l8OXpZOHEu8nMGvNTjb651bV4ASsGuFsQMD1C/NZQEVEeIj1KpeoCnY//ms6MB+XQVkfjOxkc0H6OZxxAhFbaibbaSbdSx9RpmvE53nbhNGynZVWaUDT/7uCYw2aC4/4mi/8NjhoQ/Y4akr4HQMZ9QlrKywqQ+XX4wWtUS0cLgLje7u2FHmlJlX+elf0qhOHa4MwdzWVlPM8VNkIb4WqRvS1MSqBfcWXV7LRL7L6puIMM6N6h8jnGnz5csCCKcRVCxNPdNRv7owUkaXYxIfhNru8+lr1spnow64bhfATnJ+O7urOHjyQxx2Q3fHi6/B38K41ExC+6NiP/y+90D2OABSUyAO4VbxzAjqXiWIyUV3Khhg8QAAAAGRXhpZgAASUkqAAgAAAAGABIBAwABAAAAAQAAABoBBQABAAAAVgAAABsBBQABAAAAXgAAACgBAwABAAAAAgAAABMCAwABAAAAAQAAAGmHBAABAAAAZgAAAAAAAAAvGQEA6AMAAC8ZAQDoAwAABgAAkAcABAAAADAyMTABkQcABAAAAAECAwAAoAcABAAAADAxMDABoAMAAQAAAP//AAACoAQAAQAAACwBAAADoAQAAQAAACwBAAAAAAAA"); // Decode base64 string
        }
        else if (query.split("?")[0] === 'transactions/image/id') {
            byteCharacters = atob("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");
            type = 'image/jpeg'
        }
        const byteNumbers = new Uint8Array(byteCharacters.length);

        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i); // Convert to byte numbers
        }

        const blob = new Blob([byteNumbers], { type: type }); // Create a Blob
        result = URL.createObjectURL(blob);
    }

    return result;
}

export default { fetchData, fetchImg };