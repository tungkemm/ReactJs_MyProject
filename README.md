# Hướng dẫn chạy project

## Bước 1: Clone project về máy

### `git@github.com:tungkemm/myproject.git`

## Bước 2: Setup JsonServer

### Tạo 1 folder mới (không nằm trong folder đã clone project), đặt tên là JsonServer và cài đặt JsonSever theo hướng dẫn tại:

`https://www.npmjs.com/package/json-server`

### Ở file db.json, hãy paste data này vào:

{
    "listwork": [
        {
            "id": 1,
            "namework": "Hoc js",
            "priority": "Medium",
            "status": false
        }
    ],
    "listaccount": [
        {
        "id": 1,
        "fullname": "admin",
        "address": "Ha Noi",
        "birthday": "26/11/2000",
        "phone": 3213,
        "username": "admin",
        "password": "1",
        "gmail": "kem@gmail.com"
        }
    ]
}

### Ở phần start trong file package.json, hãy paste lệnh này vào:

"start": "json-server --watch -p 4000 db.json"

### Bật terminal tại folder Json Server này, và chạy lệnh:

`npm start`

## Bước 3: Chạy project

### Mở lại folder đã clone project về máy, bật terminal tại folder này và chạy lệnh:

`npm start`
