![Logo](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/th5xamgrr6se0x5ro4g6.png)


# WIKIGPT

#### A Wikipedia integration to LLM's



## Tech Stack

**Client:** React, Scss, framer-motion, zustand 

**Server:** Node, Flask, Pinecone, togetherapi, HuggingFace 


## Run Locally

Clone the project

```
  git clone https://link-to-project
```

Go to the project directory

```
  cd my-project
```

Install dependencies for Frontend

```
  npm install
```

Install dependencies for Backend

```
  pip install -r requirements.txt
```

Start the Frontend server

```
  npm run dev
```

Start the Backend server

```
  python run.py
```


## API Reference

#### Get all items

```http
  GET /api/items
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. Your API key |

#### Get item

```http
  GET /api/items/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |

#### add(num1, num2)

Takes two numbers and returns the sum.


## Screenshots

![App Screenshot](https://via.placeholder.com/468x300?text=App+Screenshot+Here)


## Appendix

Any additional information goes here

