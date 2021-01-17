import React, { Component } from "react";
import { StyleSheet } from "react-native";
import CardView from 'react-native-cardview';
import { Table, Col, TableWrapper, Rows } from 'react-native-table-component';

import colors from '../config/colors';

class IndexTable extends Component {
  render() {
    return (
        <CardView
        style={styles.card}
        cardElevation={3}
        cardMaxElevation={5}
        cornerRadius={0}>
            <Table  style={{width:"100%"}} borderStyle={{borderWidth: 1, borderColor: colors.table_border_color}}>
                <TableWrapper style={styles.table_wrapper}>
                    <Col data={this.props.tableTitle} style={styles.table_title} heightArr={[68]} textStyle={styles.table_titleText}/>
                    <Rows data={this.props.tableData} flexArr={[2]} style={styles.table_row} textStyle={styles.table_text}/>
                </TableWrapper>
            </Table>
        </CardView>
    );
  }
}

const styles = StyleSheet.create({
    card: {
        alignSelf:"center",
        width:"100%",
        flexWrap: "wrap",
    },
    table_title: { 
        backgroundColor: colors.table_title_bg_color,
    },
    table_titleText: { 
        fontSize:12,
        fontWeight:"bold",
        color:colors.primary,
        textAlign: 'center',
        textTransform:"uppercase"
    },
    table_text: { 
        fontSize:12,
        textAlign: 'left',
        paddingLeft:16,
        paddingRight:8,
        lineHeight: 25,
    },
    table_row: {  
        backgroundColor: colors.table_data_bg_color,
        height: 68,
    },
    table_wrapper: { 
        width:"100%",
        flexDirection: 'row'
    },
})

export default IndexTable;
