SQL DATABASE INSTALLATION
1. Unzip folder
2. Install MySql and MySql WorkBench (or any sql database of your choice)
3. Import the Mock SQL Data
If you use MySQL: In MySQL, at the menu bar, Go to Server > Data Import > Import from Self-Contained File> Select the sql file in the unzipped folder > Dump Structure and Data > Import
4. If you use another database, you can create your own database called "shop".Then open the sql file and look for the pertinent "CREATE TABLE" and "INSERT INTO" sql statements and execute those statements.

SPRING JAVA 
4. Open the spring folder in the code editor of your choice
5. Go to src.main.resources > application.properties
6. change the username and password to what you set for your sql database. Also make sure the datasource.url points to your database. For MySQL, it will be "spring.datasource.url=jdbc:mysql://localhost:3306/shop..."
7. Make sure the SQL server is still running 
8. Go to src.main.java.com.example.shoppingCart.ShoppingCartApplication, and run the SpringBootApplication Class

ANGULAR
9. Now, open another code editor of your choice (I recommend Visual Studio Code) and open the angular folder. Specifically, navigate to angular > shopping-cart, e.g. cd angular/shopping-cart
10. Execute the command "npm-install" in the terminal to install the node packages
11. Go to the StringStorage class, and ensure that the apiUrl variable is set to set to "http://{springUrl}/api/". The variable is currently set to the default "http://localhost:8080/api/".
12. Execute "ng serve --open" in the terminal to execute the angular app
 