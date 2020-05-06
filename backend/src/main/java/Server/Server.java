package Server;

import static spark.Spark.*;

import com.google.gson.Gson;
import com.mongodb.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;
import java.util.ArrayList;
import java.util.List;
import dto.*;

public class Server {
    public static void main(String[] args) {

        MongoClient mongoClient = new MongoClient("localhost", 27017);
        MongoDatabase db = mongoClient.getDatabase("Database");
        MongoCollection<Document> userCollection = db.getCollection("Users");
        MongoCollection<Document> itemCollection = db.getCollection("Items");

        Gson gson = new Gson();
        port(1235);
        webSocket("/ws", WebSocketHandler.class);

        post("/api/authenticate", (req,res) -> {
            String bodyString = req.body();
            AuthDto authDto = gson.fromJson(bodyString, AuthDto.class);
            List<Document> potentialUser;
            potentialUser = userCollection.find(new Document("username",authDto.username))
                    .into(new ArrayList<>());
            if(potentialUser.size() != 1) {
                ResponseDto responseDto = new ResponseDto(false, "User not found");
                return gson.toJson(responseDto);
            }

            Document userDocument = potentialUser.get(0);
            if(!userDocument.getString("password").equals(authDto.password)) {
                ResponseDto responseDto = new ResponseDto(false, "Password is incorrect");
                return gson.toJson(responseDto);
            }

            ResponseDto responseDto =  new ResponseDto(true, null);

            return gson.toJson(responseDto);
        });

        post("/api/register", (req,res) -> {
            String bodyString = req.body();
            AuthDto authDto = gson.fromJson(bodyString, AuthDto.class);

            List<Document> potentialUser;
            potentialUser = userCollection.find(new Document("username",authDto.username))
                    .into(new ArrayList<>());
            if(!potentialUser.isEmpty()) {
                ResponseDto authResponseDto = new ResponseDto(false,"User already exists");
                return gson.toJson(authResponseDto); // turn it into a string
            }
            Document newUser = new Document()
                    .append("username", authDto.username)
                    .append("password", authDto.password);
            userCollection.insertOne(newUser);
            ResponseDto authResponseDto = new ResponseDto(true,null);
            return gson.toJson(authResponseDto);
        });

        post("/api/addItem", (req,res) -> {
            String bodyString = req.body();
            // AuthDto authDto = gson.fromJson(bodyString, AuthDto.class);
            System.out.println(bodyString);
            ItemDto itemDto = gson.fromJson(bodyString, ItemDto.class);
            System.out.println(itemDto.price);
            Document newItem = new Document()
                    .append("name", itemDto.name)
                    .append("price", itemDto.price);
            itemCollection.insertOne(newItem);


            ResponseDto authResponseDto = new ResponseDto(true,null);
            return gson.toJson(authResponseDto);
        });
    }
}

