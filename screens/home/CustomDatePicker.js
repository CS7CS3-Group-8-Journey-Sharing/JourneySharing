import React from 'react';
import { TouchableOpacity, Platform, Text, StyleSheet } from 'react-native';
//import styled from 'styled-components';
import DateTimePicker from '@react-native-community/datetimepicker';

export default class CustomDatePicker extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            date: new Date(this.props.date),
            mode: this.props.mode,
        };
    }

    render() {
        const { onClose, onChange } = this.props;
        const { date, mode } = this.state;
        return (
            <TouchableOpacity style={styles.touchable} onPress={onClose}>
                {Platform.OS === 'ios' && (
                    <View style={styles.header}>
                        <TouchableOpacity onPress={onClose}>
                            <Text>Done</Text>
                        </TouchableOpacity>
                    </View>
                )}
                <DateTimePicker
                    value={date}
                    mode={mode}
                    is24Hour={true}
                    display="default"
                    onChange={(e, d) => {
                        if (Platform.OS === 'ios') {
                            this.setState({ date: d });
                            onChange(d);
                        } else {
                            onClose(d);
                        }
                    }}
                    style={{ backgroundColor: 'white' }}
                />
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    // rename
    touchable: {
        //backgroundColor: {Platform.OS === 'ios' ? '#00000066' : 'transparent'},
        position: "absolute",
        justifyContent: "flex-end",
        width: "100%",
        height: "100%",
    },

    header: {
        padding: "16px",
        width: "100%",
        padding: "16px",
        justifyContent: "flex-end",
        alignItems: "flex-end",
        backgroundColor: "white",
        borderBottomWidth: 1,
        borderColor: "grey",
    },
});