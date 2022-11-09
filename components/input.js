import { useState } from React
import styles from '../styles/Home.module.css'
import useSWR from 'swr'

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function Input() {
    const [inputText, setInputText] = useState('');
    const [message, setMessage] = useState(null);

    async function submitForm(text) {
        await fetch('/api/addItem', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(text)
        })
        .then(res => setMessage('Success'))
        .catch(err => setMessage(JSON.stringify(err)))
    } 

    if (message) return <div className={styles.input}>{message}</div>
    return (
        <div className={styles.input}>
            <h3>Send us a suggestion to take a look at... Maybe we'll add it to the list</h3>
            <input type="text" placeholder="www.notion.so" onChange={setInputText()} />
            <button type="submit" onSubmit={submitForm(inputText)}>Submit</button>
        </div>
    )
}