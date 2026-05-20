import app from "./app"
import config from "./config/config";

const main =async()=>{
    app.listen(config.port,()=>{
        console.log(`server app listening port on ${config.port}`);
    })
}
main()