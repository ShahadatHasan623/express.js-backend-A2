import app from "./app"
import config from "./config/config";
import { initDB } from "./db/data";

const main =async()=>{
    initDB()
    app.listen(config.port,()=>{
        console.log(`server app listening port on ${config.port}`);
    })
}
main()