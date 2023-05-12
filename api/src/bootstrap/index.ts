const init = () => {
    if (process.env.NODE_ENV !== "production") {
        require("dotenv").config({
            path: process.env.NODE_ENV !== "test" ? ".env" : ".env.test",
        });
    }
}

export default init;