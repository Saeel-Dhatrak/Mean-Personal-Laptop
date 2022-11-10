function createResult(error, dbResult){
    const result = { status: ''}

    if(error){
        result['status'] = 'error'
        result['error'] = error 
    }
    else{
        result['status'] = 'success'
        result['data'] = dbResult
     }

     return result
}

module.exports = {
    createResult: createResult
}