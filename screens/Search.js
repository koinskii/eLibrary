import React from "react"
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, } from "react-native"
import db from "../config"
import firebase from 'firebase'
import { Avatar, ListItem, Icon } from "react-native-elements"

export default class Search extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            allTransactions: [],
            searchText: '',
            lastVisibleTransaction: null,

        }
    }
    componentDidMount() {
        this.getTransaction()
    }

    getTransaction = () => {
        db.collection('transactions')
            .limit(10)
            .get().then(
                snapshot => {
                    snapshot.docs.map(doc => {
                        this.setState({
                            allTransactions: [...this.state.allTransactions, doc.data()],
                            lastVisibleTransaction: doc
                        })
                    })
                }
            )
    }

    renderItem = ({ item, i }) => {
        var date = item.date
            .toDate()
            .toString()
            .split(" ")
            .splice(0, 4)
            .join(" ");

        var transactionType =
            item.transaction_type === "issue" ? "entregue" : "devolvido";
        return (
            <View style={{ borderWidth: 1 }}>
                <ListItem key={i} bottomDivider>
                    <Icon type={"antdesign"} name={"book"} size={40} />
                    <ListItem.Content>
                        <ListItem.Title style={styles.title}>
                            {`${item.book_name} ( ${item.book_id} )`}
                        </ListItem.Title>
                        <ListItem.Subtitle style={styles.subtitle}>
                            {`Este livro foi ${transactionType} por ${item.student_name}`}
                        </ListItem.Subtitle>
                        <View style={styles.lowerLeftContaiiner}>
                            <View style={styles.transactionContainer}>
                                <Text
                                    style={[
                                        styles.transactionText,
                                        {
                                            color:
                                                item.transaction_type === "issue"
                                                    ? "#78D304"
                                                    : "#0364F4"
                                        }
                                    ]}
                                >
                                    {item.transaction_type.charAt(0).toUpperCase() +
                                        item.transaction_type.slice(1)}
                                </Text>
                                <Icon
                                    type={"ionicon"}
                                    name={
                                        item.transaction_type === "issue"
                                            ? "checkmark-circle-outline"
                                            : "arrow-redo-circle-outline"
                                    }
                                    color={
                                        item.transaction_type === "issue" ? "#78D304" : "#0364F4"
                                    }
                                />
                            </View>
                            <Text style={styles.date}>{date}</Text>
                        </View>
                    </ListItem.Content>
                </ListItem>
            </View>
        );
    };

    //realizando uma busca
    handleSearch = async text => {
        var enteredText = text.toUpperCase().split("");//convertendo o texto em UPPERCASE e dividindo as letras em um array
        text = text.toLowerCase(); //convertendo o texto em lowerCase
        this.setState({
            allTransactions: [] //zerando as transações
        });
        if (!text) {
            this.getTransactions(); //se o texto estiver em branco chamo as transações
        }

        if (enteredText[0] === "B") { //se o texto começar como B busco pelo BookId
            db.collection("transactions")
                .where("book_id", "==", text)
                .get()
                .then(snapshot => {
                    snapshot.docs.map(doc => {
                        this.setState({
                            allTransactions: [...this.state.allTransactions, doc.data()],//Jogo no array todas as transações com o livro em questão
                            lastVisibleTransaction: doc
                        });
                    });
                });
        } else if (enteredText[0] === "S") { //se o texto começar com S busco pelo StudentId
            db.collection("transactions")
                .where("student_id", "==", text)
                .get()
                .then(snapshot => {
                    snapshot.docs.map(doc => {
                        this.setState({
                            allTransactions: [...this.state.allTransactions, doc.data()],//Jogo no array todas as transações com o estudante em questão
                            lastVisibleTransaction: doc
                        });
                    });
                });
        }
    };

    fetchMoreTransactions = async (text) => {
        var enteredText = text.toUpperCase().split()
        text = text.toLowerCase()
        this.setState({
            allTransactions: [] //zerando as transações
        });
        if (!text) {
            this.getTransactions(); //se o texto estiver em branco chamo as transações
        }
        const { lastVisibleTransaction, allTransactions } = this.state
        if (enteredText[0] == 'B') {
            const query = await db.collection('transactions')
                .where('book_id', '==', text)
                .startAfter(lastVisibleTransaction)
                .limit(10)
                .get()
            query.docs.map(doc => {
                this.setState({
                    allTransactions: [...this.state.allTransactions, doc.data()],
                    lastVisibleTransaction: doc
                })
            })

        } else if(enteredText[0]=='S') {
            const query = await db.collection('transactions')
            .where('student_id', '==', text)
            .startAfter(lastVisibleTransaction)
            .limit(10)
            .get()
        query.docs.map(doc => {
            this.setState({
                allTransactions: [...this.state.allTransactions, doc.data()],
                lastVisibleTransaction: doc
            })
        })
        }


    }


    render() {
        const { allTransactions, searchText } = this.state
        return (
            <View style={styles.container}>
                <View style={styles.upperContainer}>
                    <View style={styles.textinputContainer}>
                        <TextInput style={styles.textinput}
                            onChangeText={text => { this.setState({ searchText: text }) }}
                            placeholder="Digite Aqui"
                            placeholderTextColor={"#fff"}
                        />
                        <TouchableOpacity style={styles.scanbutton}
                            onPress={() => { this.handleSearch(searchText) }}>
                            <Text style={styles.scanbuttonText}>
                                Consultar
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.lowerContainer}>
                    <FlatList
                        data={allTransactions}
                        renderItem={this.renderItem}
                        keyExtractor={(item, index) => { index.toString() }}
                        onEndReached={()=>{this.fetchMoreTransactions(searchText)} }
                        onEndReachedThreshold={0.7}
                    />

                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#5653D4"
    },
    upperContainer: {
        flex: 0.2,
        justifyContent: "center",
        alignItems: "center"
    },
    textinputContainer: {
        borderWidth: 2,
        borderRadius: 10,
        flexDirection: "row",
        backgroundColor: "#9DFD24",
        borderColor: "#FFFFFF"
    },
    textinput: {
        width: "57%",
        height: 50,
        padding: 10,
        borderColor: "#FFFFFF",
        borderRadius: 10,
        borderWidth: 3,
        fontSize: 18,
        backgroundColor: "#5653D4",
        color: "#FFFFFF"
    },
    scanbutton: {
        width: 100,
        height: 50,
        backgroundColor: "#9DFD24",
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        justifyContent: "center",
        alignItems: "center"
    },
    scanbuttonText: {
        fontSize: 20,
        color: "#0A0101",
    },
    lowerContainer: {
        flex: 0.8,
        backgroundColor: "#FFFFFF"
    },
    title: {
        fontSize: 20,
    },
    subtitle: {
        fontSize: 16,
    },
    lowerLeftContaiiner: {
        alignSelf: "flex-end",
        marginTop: -40
    },
    transactionContainer: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center"
    },
    transactionText: {
        fontSize: 20,

    },
    date: {
        fontSize: 12,
        paddingTop: 5
    }
});

