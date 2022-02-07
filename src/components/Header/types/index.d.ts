interface IHeaderProps {
    inputValue?:string;
    onPress?:()=>Promise;
    onChangeText?:(string)=>void;
    route?:string;
    title?:string;
}

export { IHeaderProps };
