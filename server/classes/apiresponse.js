function ApiResponse(resp_status, resp_code,resp_message ){
    this.response_status=resp_status;
    this.response_code = resp_code;
    this.response_message =resp_message;
}
module.exports = ApiResponse;