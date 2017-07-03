var data=[{
    "_id": "592d5188e105cf49838ab0e5",
    "index": 0,
    "guid": "55edb76c-f6ff-4f0c-a04e-c2517ccc9902",
    "isActive": false,
    "balance": "$1,622.20",
    "picture": "http://placehold.it/32x32",
    "age": 30,
    "eyeColor": "brown",
    "name": "Glass Mayer",
    "gender": "male",
    "company": "COMTEXT",
    "email": "glassmayer@comtext.com",
    "phone": "+1 (992) 499-2268",
    "address": "229 Howard Alley, Irwin, Kansas, 5006",
    "about": "Anim enim laborum deserunt in est ea laboris. Ad adipisicing cillum est laboris tempor eu non ex non veniam adipisicing laboris ad. Laboris aliqua pariatur pariatur aute nostrud aliquip ex mollit esse ut Lorem. Labore ullamco cillum ea quis in velit tempor mollit est fugiat.\r\n",
    "registered": "2014-12-29T10:08:59 -06:-30",
    "latitude": -52.672735,
    "longitude": 89.373593,
    "tags": [
      "sint",
      "occaecat",
      "adipisicing",
      "et",
      "et",
      "adipisicing",
      "velit"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Frieda Fitzgerald"
      },
      {
        "id": 1,
        "name": "Carlson Boyer"
      },
      {
        "id": 2,
        "name": "Flowers Blanchard"
      }
    ],
    "greeting": "Hello, Glass Mayer! You have 7 unread messages.",
    "favoriteFruit": "strawberry"
  },{
"name":"Jitesh",
"address":"affle",
"gender":"male",
"friends":["arijit","rehen","ritika"],
"phone":1000

}

]






function readJson(dataa,key1,key2,key3,key4)

{
  var objArray=[];
   
  for(var i=0;i<dataa.length;i++){
   var obj={};
    var item=dataa[i];
    console.log(key1);
     if(item.hasOwnProperty(key1)){
        obj.key1=item[key1];
     }
    
    if(item.hasOwnProperty(key2)){
      obj.key2=item[key2]
    }
    if(item.hasOwnProperty(key3)){
      obj.key3=item[key3]
    }
    if(item.hasOwnProperty(key4)){
      obj.key4=item[key4]
    }
  objArray[i]=obj;
  }



return objArray;

}
readJson(data,"name","address","gender","friends");
