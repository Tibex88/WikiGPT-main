![Logo](/public/logo.png)


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
  GET /articles
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
|     N/A   |   N/A    |         N/A                |

#### Get article list

```http
  GET /article
```

| Parameter | Type     | Description                                  |
| :-------- | :------- | :--------------------------------            |
|`query`    | `string` | **Required**. Question regarding the article |
|`namespace`| `string` | **Required**. Title for the article           |

#### asking questions

```http
  POST /new article
```

| Parameter | Type     | Description                                  |
| :-------- | :------- | :--------------------------------            |
|`title`    | `string` | **Required**. Title for the article           |

#### Preparing an article for questioning

```http
  DELETE /article
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
|`article`  | `string` | **Required**. Title for the article|

#### Deleting an article 


## Screenshots

![App Screenshot](/screenshots/1.png)
![App Screenshot](/screenshots/2.png)
![App Screenshot](/screenshots/3.png)


## Appendix

Any additional information goes here

