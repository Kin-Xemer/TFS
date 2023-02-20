export const convertDate = (date) =>{
    let year = date.slice(0, 4);
    let month = date.slice(5, 7);
    let day = date.slice(8, 10);
    let time = date.slice(11,16);
    return day + "/" + month + "/" + year + "  " + time ;
}