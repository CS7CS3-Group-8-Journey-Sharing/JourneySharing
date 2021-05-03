import * as React from 'react';
import { Image, Button, Text, View, StyleSheet,ScrollView } from 'react-native';
import { Avatar ,ListItem,Rating, AirbnbRating,Icon} from 'react-native-elements';
import { TextInput } from 'react-native-gesture-handler';
import AuthContext from '../../context/AuthContext';
import { getJourneysOfUser, updateToSeen } from "../../utils/APIcalls";
import JourneyListView from "../../components/JourneyListView";
import COLORS from "../../common/colors"
import RequestsListView from '../../components/RequestsListView';

export default function NotificationsScreen({ navigation })  {
    const { notifications, userToken } = React.useContext(AuthContext);

    const goToProfilePage = (user) => {
        navigation.navigate("OtherUserProfileScreen", {user: user})
    }

    React.useEffect(() => {
        if(notifications.length > 0){
            var notificationsIds = [];
            notifications.forEach((notification) => notificationsIds.push(notification.requestId));
            if(notificationsIds.length > 0){
                 updateToSeen(notificationsIds, userToken).then(() => {}).catch(error => console.log(error));
            }
        }
    }, [])

    if(notifications.length > 0)
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Join Journey Requests</Text>
                <ScrollView>
                    <RequestsListView
                        navigation={navigation}
                        list={notifications}
                        goToProfilePage={goToProfilePage}
                    />
                </ScrollView>
            </View>
        );
    else 
        return (
            <View style={styles.container}>
                <View style={styles.center}>
                    <Text style={{ marginBottom: 10 }}>
                        You have no notifications
                    </Text>
                </View>
            </View>
        );
}
  
  
const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        alignItems: 'stretch',
    },
    title: {
        marginHorizontal: 10, 
        marginTop: 10,
        fontSize: 25,
        fontWeight: "bold"
    },
    center: {
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
});
