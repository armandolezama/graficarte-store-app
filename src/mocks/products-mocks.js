export default [
  {
    id: '1',
    productName: 'Último grito del arte', 
    productImage : './assets/paint-art.jpg',
    price : '50.00',
    desctiption : 'Pieza de arte abstracro elaborada en paint. Podrá adornar tu sala'
  },
  {
    id: '2',
    productName: 'Último grito del arte', 
    productImage : './assets/paint-art.jpg',
    price : '50.00',
    desctiption : 'Pieza de arte abstracro elaborada en paint. Podrá adornar tu sala'
  },
  {
    id: '3',
    productName: 'Último grito del arte', 
    productImage : './assets/paint-art.jpg',
    price : '50.00',
    desctiption : 'Pieza de arte abstracro elaborada en paint. Podrá adornar tu sala'
  },
  {
    id: '4',
    productName: 'Último grito del arte', 
    productImage : './assets/paint-art.jpg',
    price : '50.00',
    desctiption : 'Pieza de arte abstracro elaborada en paint. Podrá adornar tu sala'
  },
  {
    id: '5',
    productName: 'Último grito del arte', 
    productImage : './assets/paint-art.jpg',
    price : '50.00',
    desctiption : 'Pieza de arte abstracro elaborada en paint. Podrá adornar tu sala'
  },
  {
    id: '6',
    productName: 'Último grito del arte', 
    productImage : './assets/paint-art.jpg',
    price : '50.00',
    desctiption : 'Pieza de arte abstracro elaborada en paint. Podrá adornar tu sala'
  },
  {
    id: '7',
    productName: 'Último grito del arte', 
    productImage : './assets/paint-art.jpg',
    price : '50.00',
    desctiption : 'Pieza de arte abstracro elaborada en paint. Podrá adornar tu sala'
  },
  {
    id: '8',
    productName: 'Último grito del arte', 
    productImage : './assets/paint-art.jpg',
    price : '50.00',
    desctiption : 'Pieza de arte abstracro elaborada en paint. Podrá adornar tu sala'
  },
  {
    id: '9',
    productName: 'Último grito del arte', 
    productImage : './assets/paint-art.jpg',
    price : '50.00',
    desctiption : 'Pieza de arte abstracro elaborada en paint. Podrá adornar tu sala'
  }
]


/*
This is a seed used in: https://json-generator.com/


[
  '{{repeat(50)}}',
  {
    name: function(tags){
      var typeOfArtWork = [ 'painting', 'sculpture', 'musical recording', 'poem', 'book', 'manuscript', 'statue', 'drawing', 'script'];
      var featuresOfartWork = ['unique', 'high quality', 'lost', 'common', 'bad quality', 'most popular'];
      return tags.surname() + ' ' + featuresOfartWork[tags.integer(0, featuresOfartWork.length - 1)]  + ' ' + typeOfArtWork[tags.integer(0, typeOfArtWork.length - 1)];
    },
    price: '{{integer(400, 50000, `$0,0.00`)}}',
    description: '{{lorem(3, "paragraph")}}',
    ratings: '{{integer(0, 5)}}',
    active: true,
    author: '{{firstName()}} {{firstName()}} {{surname()}} {{surname()}}',
    created: '{{date(new Date(1800, 0, 1), new Date(2000, 0, 1), "YYYY-MM-dd")}}',
    stock: '{{integer(80, 400)}}',
    comments: [
      '{{repeat(3, 10)}}',
      {
      name: '{{firstName()}} {{surname()}}',
      opinion: '{{lorem(2)}}',
      rating: '{{integer(0, 5)}}',
      created: '{{date(new Date(2001, 0, 1), new Date(), "YYYY-MM-dd")}}'
      }
    ]
    
  }
]
*/