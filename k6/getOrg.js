import http from 'k6/http'
import { check } from "k6"
const tokens = open("tokens.json")
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";

export let options = {
    insecureSkipTLSVerify: true,
    noConnectionReuse: false,
    stages: 
    [
        //stress
    { duration: "1s", target: 10 },
    // { duration: "30s", target: 300 },
    // { duration: "30s", target: 500 },
    // { duration: "30s", target: 700 },
    // { duration: "30s", target: 1000 },
    // { duration: "30s", target: 1250 },
    // { duration: "30s", target: 1500 },
    // { duration: "30s", target: 1750 },
    //     //load
    // { duration: "30s", target: 500 },
    // { duration: "6m", target: 500 },
    // { duration: "30s", target: 250 },
    // { duration: "30s", target: 10 },                                                     
    //     //spike
    // { duration: "30s", target: 200 },
    // { duration: "10s", target: 5000 },
    // { duration: "30s", target: 200 },
    //     //soak
    // {duration: "12h", target: 750}

    ],
    thresholdsP: {
        http_req_duration: ["p(90) < 450, p(95) < 550, p(99) < 20000"],
        http_req_failed: ["rate < 0.01"]
    }
}

export default function () {
    let token = JSON.parse(tokens)
    let res = http.get("https://cypress-api.vivifyscrum-stage.com/api/v2/my-organizations",
        {
            headers: {
                Autorization: `Bearer ${token.token}`
            }
        }
    );
    check(res, {
        "status is 200": (r) => r.status === 200
        // "status is not 200" : (r) => {
        //     if(r.status !== 200){
        //         console.log(JSON.stringify(`${r.status} ^^^^^^^^^^ ${r.body}`))
        //     }
        //}
    })

}
export function handleSummary(data) {
    return {
      "result.html": htmlReport(data),
      stdout: textSummary(data, { indent: " ", enableColors: true }),
    };
  }