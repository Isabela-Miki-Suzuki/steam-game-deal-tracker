import * as React from 'react';
import { ActivityIndicator, View, FlatList, TouchableHighlight } from 'react-native';
import styled from 'styled-components/native';

export function Search () {
  const [loading, setLoading] = React.useState(true);
  const [list, setList] = React.useState([]);
  const [title, setTitle] = React.useState('');
  const [minPrice, setMinPrice] = React.useState('');
  const [maxPrice, setMaxPrice] = React.useState('');
  const [filteredList, setFilteredList] = React.useState([])

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://www.cheapshark.com/api/1.0/deals?storeID=1');
        const data = await response.json();
        setList(data);
        setFilteredList(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const searchTitle = (inputtedText) => {
    setTitle(inputtedText)
    if (title !== '') {
      const filteredData = list.filter((item) => {
          return item.title.toLowerCase().includes(title.toLowerCase())
      })
      setFilteredList(filteredData)
    }
    else {
      setFilteredList(list)
    }
  }

const filterByPrice = () => {
  let filteredData = list;

  if (minPrice !== '') {
    filteredData = filteredData.filter((item) => parseFloat(item.salePrice) >= parseFloat(minPrice));
  }

  if (maxPrice !== '') {
    filteredData = filteredData.filter((item) => parseFloat(item.salePrice) <= parseFloat(maxPrice));
  }

  setFilteredList(filteredData);
};

  const showItem = ({ item })  => {
    let scoreColor = '#AC1717'; // red
    if (parseFloat(item.metacriticScore) >= 80) {
      scoreColor = '#2C9049'; // green
    } else if (parseFloat(item.metacriticScore)  >= 65) {
      scoreColor = '#E4A10D'; // yellow
    }
    return (
      <Rectangle15>
        <Title> {item.title} </Title>
        <Image67 source={{uri: item.thumb}} />
        <Rectangle12 scoreColor={scoreColor}>
          <BadgeLabel> {item.metacriticScore} </BadgeLabel>
        </Rectangle12>
        <PriceOld>  {item.normalPrice} </PriceOld>
        <NewPrice> {item.salePrice} </NewPrice>
      </Rectangle15>
    );
  };

return (
  <View>
    <Rectangle16>
      <Space/>
      <BigInput
        placeholder="Buscar por título" 
        onChangeText={text => searchTitle(text)}/>
      <RectangleForInput>
        <Label> Menor preço:</Label>
        <SmallInput
        onChangeText={text => setMinPrice(text)}
        />
      </RectangleForInput>
      <RectangleForInput>
        <Label> Maior preço: </Label>
        <SmallInput
        onChangeText={text => setMaxPrice(text)} 
        />
      </RectangleForInput>
      <TouchableHighlight onPress={filterByPrice}>
        <ButtonView>
          <ShowResultsLabel> Mostrar resultados </ShowResultsLabel>
        </ButtonView>
      </TouchableHighlight>
    </Rectangle16>
    {loading && <ActivityIndicator size={'large'} />}
    <FlatList 
      data={filteredList}
      keyExtractor={(item) => parseFloat(item.gameID)}
      renderItem={showItem}
    />
  </View>
  );
}

const Rectangle16 = styled.View`
  height: 372px;
  background: #38344E;
  border-radius: 0px 0px 16px 16px;
  justify-content: space-evenly;
  border: 2px solid #DDDDDD;
  border-radius: 2px;
`;

const Space = styled.View`
  width: 328px;
  height: 30px;
  box-sizing: border-box;
  padding: 10px;
`

const BigInput = styled.TextInput`
  width: 328px;
  height: 44px;
  box-sizing: border-box;
  left: 0%;
  right: 0%;
  top: 0%;
  bottom: 0%;
  background: #FFFFFF;
  border: 1px solid #DDDDDD;
  border-radius: 2px;
  padding: 10px;
`;

const RectangleForInput = styled.View`
  width: 156px;
  height: 64px;
`;

const SmallInput = styled.TextInput`
  box-sizing: border-box;
  position: absolute;
  height: 44px;
  left: 0%;
  right: 0%;
  top: 20px;
  background: #FFFFFF;
  border: 1px solid #DDDDDD;
  border-radius: 2px;
`;

const Label = styled.Text`
  position: absolute;
  height: 16px;
  left: 0px;
  top: 0px;
  font-family: 'Open Sans';
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: #FFFFFF;
`;

const ButtonView = styled.View`
  width: 328px;
  height: 44px;
  background: #F6C224;
  border-radius: 2px;
  justify-content: center;
`;

const ShowResultsLabel = styled.Text`
  position: absolute;
  left: 5.56%;
  right: 5.56%;
  top: 22.5%;
  bottom: 27.5%;
  font-family: 'Open Sans';
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 22px;
  text-align: center;
  color: #222222;
`;

const Rectangle15 = styled.View`
width: 360px;
height: 79px;
left: 0px;
top: 0px;
background: #FFFFFF;
`;

const Title = styled.Text`
width: 328px;
height: 19px;
left: calc(50% - 328px/2);
top: 8px;
font-family: 'Open Sans';
font-style: normal;
font-weight: 600;
font-size: 14px;
line-height: 19px;
color: #222222;
`;

const Image67 = styled.Image`
position: absolute;
height: 36px;
left: 4.44%;
right: 68.89%;
top: 35px;
`;


const Rectangle12 = styled.View`
position: absolute;
height: 32px;
left: 35.56%;
right: 55.56%;
top: 46.25%;
bottom: 13.75%;
top: 37px;
background: ${props => props.scoreColor};
border-radius: 8px;
justify-content: center;
`;

const BadgeLabel = styled.Text`
font-family: 'Open Sans';
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 14px;
align-items: center;
text-align: center;
letter-spacing: 0.05em;
text-transform: uppercase;
color: #FFFFFF;
`;

const PriceOld = styled.Text`
position: absolute;
width: 41px;
height: 24px;
left: 249px;
top: 47px;
font-family: 'Open Sans';
font-style: normal;
font-weight: 400;
font-size: 12px;
line-height: 24px;
text-decoration-line: line-through;
color: #525252;
`;

const NewPrice = styled.Text`
position: absolute;
width: 46px;
height: 24px;
left: 298px;
top: 47px;
font-family: 'Open Sans';
font-style: normal;
font-weight: 700;
font-size: 16px;
line-height: 24px;
color: #222222;
`;