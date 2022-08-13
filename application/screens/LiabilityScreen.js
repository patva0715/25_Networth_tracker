



import { LinearGradient } from 'expo-linear-gradient'
import React, { useEffect, useState } from 'react'
import { FlatList, Modal, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import Input from '../components/Input'
import Item from '../components/Item'
import Template from '../components/Template'
import { add, addInit, remove } from '../state/reducers/liabilitiesReducer'
import theme from '../theme'
import { Entypo, } from '@expo/vector-icons';
import Menu from '../components/Menu'

const categories = ['Credit Card', 'Student Loans', 'Car Loan']
const icons = [{
  name: 'credit-card',
  color: 'rgb(256,170,110)'
}, {
  name: 'graduation-cap',
  color: 'rgb(145,200,200)'
}, {
  name: 'gauge',
  color: 'rgb(211,70,80)'
}, {
  name: 'laptop',
  color: 'rgb(207,140,120)'
}, {
  name: 'book',
  color: 'rgb(239,176,129)'
}, {
  name: 'box',
  color: 'white'
},]
const LiabilityScreen = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const [category, setCategory] = useState("")
  const [inputOpen, setInputOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [focusedAsset, setFocusedAsset] = useState({})

  const dispatch = useDispatch()

  const liabilities = useSelector(state => state.liabilities)


  const renderItem = ({ item, index }) => {
    return (
      <View style={{ display: modalOpen ? 'none' : 'flex', }}>
        <Item total={liabilities[index].total} item={item} index={index} add={add} icon={icons[index]} modalOpen={modalOpen} menuOpen={menuOpen} setMenuOpen={setMenuOpen} setFocusedAsset={setFocusedAsset} />
      </View>
    )
  }
  const handleEdit = () => {

  }
  const handleDelete = () => {
    setMenuOpen(false)
    dispatch(remove(focusedAsset))
  }
  const toggleMenu = () => {

  }

  return (
    <Template>
      {/* HEADER ======== */}
      <View style={{ flexGrow: 0, paddingHorizontal: 25, flexDirection: 'row', position: 'relative', zIndex: 100, alignItems: 'center' }}>
        <Text style={styles.title}>Liabilities</Text>
        <TouchableOpacity style={styles.addButton} onPress={() => setModalOpen(true)}>
          <Entypo name='plus' size={30} color={theme.text} style={{ width: 30, fontWeight: '600' }} />
        </TouchableOpacity>
        {/* DEBUG ACTIONS ========== */}
        {/* <TouchableOpacity style={styles.addButton} onPress={() => dispatch(addInit(false))}>
          <Text style={styles.addButtonText}>A</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.addButton} onPress={() => dispatch(addInit(sampleData))}>
          <Text style={styles.addButtonText}>B</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.addButton} onPress={() => dispatch(addInit(sampleData))}>
          <Text style={styles.addButtonText}>C</Text>
        </TouchableOpacity> */}
        <LinearGradient
          colors={['rgba(0,0,0,.33)', 'transparent']}
          style={{
            height: 25,
            width: '120%',
            position: 'absolute',
            bottom: -25,
            left: 0
          }}
          start={{ x: .5, y: 0 }}
          end={{ x: .5, y: 1 }}
        />
      </View>
      {/* BODY ========*/}
      <View style={{ flexGrow: 1, flex: 1, paddingHorizontal: 16 }}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={liabilities}
          renderItem={renderItem}
          keyExtractor={(item) => item.categoryName}
          ListFooterComponent={<View style={{ minHeight: 100 }} />}
          ListHeaderComponent={<View style={{ minHeight: 20 }} />}
        >
        </FlatList>
      </View>
      {/* MODAL ========*/}
      <Modal animationType="fade" transparent={true} visible={modalOpen}>
        <View style={styles.modal}>
          {inputOpen ?
            // INPUT =======
            <Input category={category} setInputOpen={setInputOpen} setModalOpen={setModalOpen} add={add} />
            :
            // CATEGORY SELECT =======
            <>
              <Text style={{ color: theme.text, fontSize: 22, marginBottom: 10 }}>Select Category</Text>
              <View style={styles.catListContainer}>
                {categories.map((catg, index) => (
                  <TouchableWithoutFeedback key={index} onPress={() => setCategory(catg)}>
                    <View key={index} style={[styles.categoryCard, { borderColor: category === catg ? icons[index].color : '#333' }]} onPress={() => setCategory(catg)}>
                      <Entypo name={icons[index].name} size={37} color={icons[index].color} style={{ width: 37, marginBottom: 4, fontWeight: '600' }} />
                      <Text style={styles.categoryCardText}>{catg}</Text>
                    </View>
                  </TouchableWithoutFeedback>
                ))}
              </View>
              <TouchableOpacity style={{ backgroundColor: '#ccc', padding: 8, borderRadius: 4, marginVertical: 8, alignItems: 'center', width: '40%' }} onPress={() => setInputOpen(true)}>
                <Text>Next</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setModalOpen(false)}>
                <Text style={{ color: '#999', marginVertical: 8, padding: 4 }}>Cancel</Text>
              </TouchableOpacity>
            </>
          }
        </View>
      </Modal>
      {/* MENU ========*/}
      <Menu menuOpen={menuOpen} setMenuOpen={setMenuOpen} remove={handleDelete} />
    </Template>
  )
}

const styles = StyleSheet.create({
  title: {
    color: theme.text,
    fontSize: 29,
    fontWeight: "600",
    flex: 1
  },
  addButton: {
    padding: 12,
    flex: 0,
  },
  addButtonText: {
    color: theme.text,
    fontSize: 28,
    fontWeight: 'bold',
    padding: 3
  },
  modal: {
    zIndex: 200,
    // backgroundColor: th eme.bg,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%'
  },
  catListContainer: {
    flexDirection: 'row',
    width: '100%',
    flexWrap: 'wrap'
  },
  categoryCard: {
    borderWidth: 1,
    padding: 8,
    borderRadius: 5,
    height: 100,
    flexGrow: 1,
    flexBasis: 100,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  categoryCardText: {
    color: theme.text
  }
})
export default LiabilityScreen

let sampleData = [{
  categoryName: "Cash",
  total: 0,
  top3: [],
  items: [],
  largest: null
}, {
  categoryName: "Stocks",
  total: 0,
  top3: [],
  items: [],
  largest: null
}, {
  categoryName: "Real Estate",
  total: 0,
  top3: [],
  items: [],
  largest: null
}, {
  categoryName: "Tangible",
  total: 0,
  top3: [],
  items: [],
  largest: null
}, {
  categoryName: "Intangible",
  total: 0,
  top3: [],
  items: [],
  largest: null
}, {
  categoryName: "Misc",
  total: 0,
  top3: [],
  items: [],
  largest: null
}
]