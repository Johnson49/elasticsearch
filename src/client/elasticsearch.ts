import elasticsearch from "elasticsearch";

export const getClient = () => {
    const client = new elasticsearch.Client({
        host: "localhost:9200",
        log: "trace"
    });

    return client;
}