import { MaterialCommunityIcons } from "@expo/vector-icons"
import { Center, Heading, Icon } from "native-base"
import { View } from "react-native"

const NoDataFound = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', marginBottom: '50%' }}>
      <Center>
        <Icon size={'6xl'} color={'#FF4E00'} as={<MaterialCommunityIcons  name={'database-remove-outline'} />} />
        <Heading size={'xl'} color={'gray.200'}> NO DATA FOUND </Heading>
      </Center>
    </View>
  )
}

export default NoDataFound;