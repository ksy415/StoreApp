package Server;

import com.mongodb.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;
import org.eclipse.jetty.websocket.api.Session;
import org.eclipse.jetty.websocket.api.annotations.*;
import java.io.*;
import java.util.*;
import java.util.concurrent.*;
import java.util.stream.Collectors;

@WebSocket
public class    WebSocketHandler {
    // Store sessions if you want to, for example, broadcast a message to all users
    static Map<Session, Session> sessionMap = new ConcurrentHashMap<>();
    MongoClient mongoClient = new MongoClient("localhost", 27017);
    MongoDatabase db = mongoClient.getDatabase("Database");
    MongoCollection<Document> userCollection = db.getCollection("Users");
    MongoCollection<Document> itemCollection = db.getCollection("Items");

    public static void broadcast(String message){
        sessionMap.keySet().forEach(session -> {
            // loop over sessions
            try{
                session.getRemote().sendString(message); // send same message to all
            }catch (Exception e){
                e.printStackTrace();
            }
        });
    }

    @OnWebSocketConnect
    public void connected(Session session) throws IOException {
        System.out.println("A client has connected");
        sessionMap.put(session, session);
        List<String> items = itemCollection.find().into(new ArrayList<>())
                .stream()
                .map(document -> {
                    return document.getString("name");
                })
                .collect(Collectors.toList());
        for(String item : items) {
            session.getRemote().sendString(item);
        }
    }

    @OnWebSocketClose
    public void closed(Session session, int statusCode, String reason) {
        System.out.println("A client has disconnected");
        sessionMap.remove(session);
    }

    @OnWebSocketMessage
    public void message(Session session, String message) throws IOException {
        System.out.println("Got: " + message);   // Print message
        broadcast(message);
    }
}
 