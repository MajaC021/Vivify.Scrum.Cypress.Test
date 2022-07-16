import http from "k6/http";
import { check } from "k6";
import { SharedArray } from 'k6/data'
const data = new SharedArray('users', function() {
    return JSON.parse(open("../cypress/fixtures/k6/tokensArray.json"))
})
export let options = {
  insecureSkipTLSVerify: true,
  noConnectionReuse: false,
  stages: [
    { duration: "1s", target: 10 },
  ],
  thresholds: {
    http_req_duration: ["p(90) < 10000", "p(95) < 14000", "p(99.9) < 20000"],
    http_req_failed: ["rate<0.01"],
  },
};
export default function () {
  let randomToken = data[Math.floor(Math.random() * data.length)].token
  let res = http.get(
    "https://cypress-api.vivifyscrum-stage.com/api/v2/my-organizations",
    {
      headers: {
        Authorization: `Bearer ${randomToken}`,
      },
    }
  );
  check(res, {
    "status is 200": (r) => r.status === 200,
  });
}