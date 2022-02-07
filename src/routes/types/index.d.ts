type StackProps = {
    Welcome:undefined;
    Home:undefined;
    Details:{ 
        id:string,
        title:string, 
        lat:string, 
        lon:string; 
    };
}

type IRouteProps = {
    key:string,
    name:string,
    path?:string,
    params:{
        id:string;
        title:string;
        lat:number;
        lon:number;
    }
}

export { StackProps, IRouteProps };