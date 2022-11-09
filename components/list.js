import styles from '../styles/Home.module.css'
import useSWR from 'swr'

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function List() {

    const { data, error } = useSWR('/api/getItems', fetcher)

    if (error) return <div>Failed to load {console.log(error)}</div>
    if (!data) return <div>Loading...</div>
    return (
        <div className={styles.grid}>
            {data.results.map(d => (
                <>
                {console.log(JSON.stringify(d.properties.Description))}
                <a href={d.properties.Site.url} target="_blank" className={styles.card}>
                    <h2>{d.properties.Name.title[0].plain_text} &rarr;</h2>
                    {d.properties.Tags.multi_select.map(t => <div className={styles.tag}><p>{t.name}</p></div>)}
                    <p>{d.properties.Description.rich_text[0]?.plain_text}</p>
                </a>
                </>
            )
            )}
        </div>
    )
}