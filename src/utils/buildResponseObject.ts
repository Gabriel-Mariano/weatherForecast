export const successObject = (data:any) =>{
    return {
        success:true,
        data:data
    }
}

export const failedObject = (data:any) => {
    return {
        success:false,
        data:data.response.data.message || undefined,
    }
}