import Card from './Card'
function PersonList(){
    const List=[
      
      {  id:1,
        Name:"VIGNESH H",
        url:"https://instagram.com/____vickii____?igshid=MzRlODBiNWFlZA==",
        url1:"https://www.linkedin.com/in/vignesh-hari-24310a22b",
        img:"vickii.jpg"
      },
      {
        id:2,
        Name:'VINAY M',
        url:'https://instagram.com/___vinay___vk?igshid=OTk0YzhjMDVlZA==',
        url1:'https://www.linkedin.com/in/vinay-m-72333b25a',
        img:"vinay.jpg"
      },
      {
        id:3,
        Name:'HARDIK JAIN',
        url:'https://instagram.com/_hady_jain?igshid=NTc4MTIwNjQ2YQ==',
        url1:'https://in.linkedin.com/in/hardik-jain-b60656226',
        img:"hady.jpg"

      },
      {
        id:4,
        Name:'TARUN J',
        url:'https://instagram.com/crwlnprwn?igshid=NTc4MTIwNjQ2YQ==',
        url1:'https://www.linkedin.com/in/tarun-j-395848202',
        img:"tarunn.jpg"

      }
    ]

    return(
    <>
    {List.map((data)=><Card key={data.id} name={data.Name} Url={data.url} Img={data.img} Url1={data.url1}/>)}
   
    </>
    )
  }
   
export  default PersonList;