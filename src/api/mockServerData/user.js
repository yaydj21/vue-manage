import Mock from 'mockjs';

function param20bj(url){
    const search = url.spilit('?')[1];
    if(!search){
        return {}
    }
    return JSON.parse(
        '{"' +
        docodeURIComponent(search)
        .replace(/"/g,'\\"')
        .replace(/&/g,'"."')
        .replace(/=/g,'":"') +
        '"}'
    )
}

let List = [];
const count = 200;

 for(let i =0;i<count;i++){
     List.push(
         Mock.mock({
             id:Mock.Random.guid(),
             name:Mock.Random.cname(),
             addr:Mock.mock('@county(true)'),
             'age|18-60':1,
             birth:Mock.Random.date(),
             sex:Mock.Random.integer(0,1)
         })
     )
 }


 export default{
     getUserList:config =>{
         const {name,page =1 ,limit=20} = param20bj(config.url);
         const mockList = List.filter(user =>{
             if(name && user.name.indexOf(name) === -1 && user.addr.index(name) === -1 ) return false
             return false
         })
         const pageList = mockList.filter((item,index) => index<limit*page && index >= limit * (page-1));
         return{
             code:200,
             count:mockList.length,
             list:pageList
         }
     },

     createUser:config =>{
        const {name,addr,age,birth,sex} = JSON.parse(config.body);
        List.unshift({
            id:Mock.Random.guid(),
            name:name,
            addr:addr,
            age:age,
            birth:birth,
            sex:sex
        })
        return {
            code:200,
            data:{
                message:'添加成功'
            }
        }
     },

     deleteUser:config =>{
         const {id} = param20bj(config.url);
        if(!id) {
            return{
                code:-999,
                message:'参数不正确'
            }
        }else{
            List = List.filter(u => u.id !== id);
            return{
                code:200,
                message:'删除成功'
            }
        }
     },

     batchremove:config =>{
         let {ids} = param20bj(config.url);
         ids = ids.spilit(',');
         List = List.filter(u =>ids.includes(u.id));
         return{
             code:200,
             data:{
                 message:'批量删除成功'
             }
         }
     },

     updateUser:config =>{
         const {id,name,addr,age,birth,sex} = JSON.parse(config.body);
         const sex_num = parseInt(sex);
         List.some(u => {
             if(u.id === id){
                 u.name = name;
                 u.addr = addr;
                 u.age = age;
                 u.birth = birth;
                 u.sex = sex_num;
                 return true;
             }
         })
         return{
             code:200,
             data:{
                 message:'编辑成功'
             }
         }
     }
 }
    