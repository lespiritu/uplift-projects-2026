



const readline = require("node:readline");

// initialize readline
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// color library
const textColor = {
  green(text) {
   return `\x1b[32m${text}\x1b[0m`
  },

  red(text) {
    return `\x1b[31m${text}\x1b[0m`
  },

   blue(text) {
   return `\x1b[34m${text}\x1b[0m`
  },

  yellow(text) {
    return `\x1b[33m${text}\x1b[0m`
  },
  greyBackground(text) {
    return `\x1b[100m${text}\x1b[0m`
  },
  separator: {
    line: "_____________________________________________",
    lineLong:"_________________________________________________________________________",
    asterist:"******************************************"
  }
}

const regexNumber = /^[0-9]+$/; // Matches one or more digits (0-9)
   

class App {
  constructor(appName) {
    this.appName = appName;
    this.books = [
      {
        id: 1,
        name: 'Learn CSS',
        quantity: 2,
        borrowedBy:[]
      },
      {
        id: 2,
        name: "Basic Javascript",
        quantity: 5,
        borrowedBy:[]
      },
      {
        id: 3,
        name: "Learn Html",
        quantity:0,
        borrowedBy:[]
      }
    ];

    this.members = [
      {
        userName: 'leon',
        fullName: 'Leon Espiritu',
        password: '123',
        isAdmin: true,
        borrowedBooks:[]
      },
      {
        userName: 'Burning',
        fullName: 'Burning Dela Cruz',
        password: '123',
        isAdmin: false,
        borrowedBooks:[]
      },
      {
        userName: "lebron",
        fullName: "Lebron James",
        password: "123",
        isAdmin: false,
        borrowedBooks: ["Learn Html", "Basic Javascript"]
      }
    ]
  }
  mainPage() {
    const page = `
        Created by: Leoncio Espiritu
        Uplift Batch 28 - Momentum

        M A I N   P A G E
            `
    console.log(textColor.separator.asterist)
    console.log(textColor.greyBackground(`               ${this.appName}             `));
    
   console.log(page);
    console.log(textColor.separator.asterist)
    console.log(textColor.blue(`[1]-Log-In  [2]-Sign-Up  [3]-Exit`));
    
      rl.question(textColor.yellow("Choose action: "), (answer) => {
      switch (answer) {
        case "1":
          console.clear();
          this.logInPage();
          break;

        case "2":
          console.clear();
          this.signUpPage();
          break;

        case "3":
          console.clear();
          console.log(textColor.green("Thank you using our App!"));
          rl.close();

          break;

        default:
          console.clear();
          console.log(textColor.red("Invalid Option!"));
          this.mainPage();
      }
    });
  }


  // log in page
  logInPage() {
    console.clear();
    console.log(textColor.separator.line);
    
    console.log("LOG-IN PAGE");
    rl.question(textColor.yellow("Enter User Name: "),(userName)=> {
     
      const findUserName = this.members.find(member => member.userName === userName);
      
      if (findUserName) {
        rl.question(textColor.yellow("Enter your password: "), (password) => {
          if (password === findUserName.password) {
            console.clear();
            console.log(textColor.green("Successfully Log in"))

            if (findUserName.isAdmin) {
              
              this.adminSelect(findUserName);
              
            }
            else {
              
              this.memberSelect(findUserName);
            }
          }
          else {
            console.clear();
            console.log(textColor.red("Wrong Password"));
            this.mainPage();
          }
        })
      }

      else {
        console.clear();
        console.log(textColor.red("Invalid User Name!"))
        this.mainPage();
      }
      
    })
  }

  // sign Up page
  signUpPage() {
    
    console.log(textColor.separator.line);
    
    console.log("SIGN-UP PAGE");
    rl.question(textColor.yellow("Enter User Name: "), (userName) => {

    const userNameExist =  this.members.find(member => member.userName === userName);

      if (userNameExist) {
        console.clear();
        console.log(textColor.red("User Name already exist!"));
        this.signUpPage();     
      }
      else {
        rl.question(textColor.yellow("Enter Your Full Name: "), (fullName) => {
            rl.question(textColor.yellow("Enter Password: "), (password) => {
              console.log(textColor.blue("[1]-Save  [2]-Cancel"));

              rl.question(textColor.yellow("Chooce Action: "), (saveAction) => {
                switch (saveAction) {
                  case "1":
                    this.members.push({ userName, fullName, password, isAdmin: false,  borrowedBooks: [] })
                    console.clear();
                    console.log(textColor.green(`Successfuly Signed-Up!`))
                    console.log(textColor.green(`You can now log-in using your account.`));
                    
                    this.mainPage();
                  break;
                  
                  case "2":
                    console.clear();
                    this.mainPage();
                  break;

                  default:
                    console.clear();
                    console.log(textColor.red("Invalid Option!"));
                    this.mainPage();
                }
              })


            })
          })
        
      }

      
    })
  }

  // admin main menu
  adminSelect(user) {
    console.log((`Welcome Admin: ${user.fullName}`));
    console.log(textColor.separator.lineLong);
    
    
    console.log(textColor.blue("[1]-Add Book  [2]-View Books  [3]-View Members  [4]-Search Book  [5]-Exit"  ));
     rl.question(textColor.yellow("Chooce action: "), (adminOptions) => {
          switch (adminOptions) {
            case "1":
              console.clear();
              this.addBookPage(user);
              break;
            
            case "2":
              console.clear();
              this.viewBooksPage(user);
              break;
            
            case "3":
              console.clear();
              this.viewMemberBorrowed(user);
              break;
            
           
            case "4":
              console.clear();
              this.searchBook(user);
              break;
            
              case "5":
              console.clear();
              console.log(textColor.green("Thank you using our App!"));
              rl.close();
              break;
            
            default:
              console.clear();
              console.log(textColor.red("Invalid Option!"));
              
              this.adminSelect(user);
              
          }
        })
  }

  // member main menu
  memberSelect(user) {
    console.log((`Welcome Member: ${user.fullName}`));
    console.log(textColor.green(`Borrowed books: ${user.borrowedBooks.length}`));
    const borrowedBookString = user.borrowedBooks.join(", ");
    console.log(borrowedBookString);
    
    
    console.log(textColor.separator.lineLong);
    
    

    console.log(textColor.blue("[1]-Borrow Book  [2]-View Books  [3]-Search Book  [4]-Exit"));
    rl.question(textColor.yellow("Chooce option: "), (select) => {
      switch (select) {
        case "1":
          console.clear();
          this.borrowBooks(user);
          break;
            
          case "2":
            console.clear();
            this.viewBooksPage(user);
          break;
        
          case "3":
            console.clear();
            this.searchBook(user);
          break;
            
          case "4":
            console.clear();
            console.log(textColor.green("Thank you using our App!"));
            rl.close();
          break;
        
          
            
          default:
            console.clear();
            console.log(textColor.red("Invalid Option!"));
            this.memberSelect(user);
          
      }
    })
  }

// for Admin Only
  addBookPage(user) {
    console.log((`Welcome Admin: ${user.fullName}`));
    console.log(textColor.separator.line);
    console.log("ADD BOOK");
    console.log(textColor.separator.line);
    
    rl.question(textColor.yellow("Enter the name book: "),  bookName => {
      const findBook = this.books.find(book => book.name === bookName);
      if (findBook) {
        console.clear();
        console.log(textColor.red("Book Already Exist!"));
        this.adminSelect(user);
        
      }
      else {
        rl.question(textColor.yellow("Enter the book quantity: "), bookQuantity => {
          const isNumber = regexNumber.test(bookQuantity)
          
          if (isNumber) {
            console.log(textColor.blue("[1]-Save   [2]-Cancel"));
            rl.question(textColor.yellow("Chooce option: "), isSave => {
              switch (isSave) {
                case "1":
                  console.clear();
                  const newBook = {
                    id: Math.floor(Math.random() * 100000),
                    name: bookName,
                    quantity: Number(bookQuantity),
                    borrowedBy:[]
                  }

                  this.books.push(newBook);
                  console.clear();
                  console.log(textColor.green("Book successfuly save in the system!"));
     
                  this.adminSelect(user);
                  break;
                
                case "2":
                  console.clear();
                  this.adminSelect(user);
                  break;
  
                default:
                  console.clear();
                  console.log(textColor.red("Invalid Option!"));
  
                  this.adminSelect(user);

              }
            })
            
          }
          else {
            console.clear();
            console.log(textColor.red("Invalid Input! Please Enter a number."));
            this.addBookPage(user);
          }
          
        })
        
      }
      
     
    })
  }

// for Admin Only
  viewMemberBorrowed(user) {
    console.log((`Welcome Admin: ${user.fullName}`));
    console.log(textColor.separator.lineLong);
    console.log("VIEW MEMBERS WITH BORROWED BOOK");
    console.log(textColor.separator.lineLong);

    const membersBorrowed = this.members.filter(member => member.borrowedBooks.length > 0);
    const membersBorrowedDisplay = membersBorrowed.map(member => {
      return {
        userName: member.userName,
        fullName: member.fullName,
        borrowedBooks: member.borrowedBooks
      }
    })
    console.table(membersBorrowedDisplay);

     console.log(textColor.blue("Enter any key to back to your Profile Page: "));
    rl.question(textColor.yellow("Choose action: "), (answer) => {
      switch (answer) {
        default:
            console.clear();
            this.adminSelect(user);
      }
    });
    
  }

  // admin and members
  viewBooksPage(user) {
    console.log(textColor.separator.line);
    const isAdmin = user.isAdmin ? "Admin" : "Member";

    console.log((`Welcome ${isAdmin}: ${user.fullName}`));
    console.log(textColor.separator.line);
    console.log("VIEW BOOKS PAGE");
    console.log(textColor.separator.line);
    console.table(this.books);

     console.log(textColor.blue("Enter any key to back to your Profile Page: "));
    rl.question(textColor.yellow("Choose action: "), (answer) => {
      switch (answer) {
        default:
          if (user.isAdmin) {
            console.clear();
            this.adminSelect(user);
          }
          else {
            console.clear();
            this.memberSelect(user);
          }
      }
    });
    
  }

  // admin and members
  searchBook(user) {

  
    console.log(textColor.separator.line);
    const isAdmin = user.isAdmin ? "Admin" : "Member";

    console.log((`Welcome ${isAdmin}: ${user.fullName}`));
    console.log(textColor.separator.line);
    console.log("SEARCH BOOK PAGE");
    console.log(textColor.separator.line);

    rl.question(textColor.yellow("Enter Book Name: "),(bookName) => {
      const findBook = this.books.find(book => book.name === bookName)
      if (findBook) {
        console.clear();
        console.table(findBook);
        console.log(textColor.blue("Enter any key to back to your Profile Page: "));
        rl.question(textColor.yellow("Choose action: "), back => {
      
          switch (back) {
            default:
              if (user.isAdmin) {
                
                console.clear();
                this.adminSelect(user);
                
              }
              else{
                console.clear();
                this.memberSelect(user);
              }
            }
      
        })
        
      }
      else {
        console.clear();
        console.log(textColor.red("The book you enter is not in the system!"));
        
        if (user.isAdmin) {
          this.adminSelect(user);
        }
        else {
          this.memberSelect(user);
        }
      }
    })
  }

  // member only
  borrowBooks(user) {
 
    console.log((`Welcome Member: ${user.fullName}`));

    console.log(textColor.separator.line);
           console.log("BORROW BOOK PAGE");
           console.log(textColor.separator.line);

    rl.question(textColor.yellow("Enter the Book Name you want to Borrow: "), bookName => {
      const findBook = this.books.find(book => {
       return book.name === bookName
      })

      const indexOfUser = this.members.findIndex(member => member.userName === user.userName);
      
      
      if (findBook) {
        console.clear();

        // This code is to verify if the book is not yet borrowed by the user
        const isUserBorrowedBook = this.members[indexOfUser].borrowedBooks.find(book => book === findBook.name)

        if (isUserBorrowedBook) {
          console.clear();
          console.log(textColor.red(`You already borrowed this book!: `), findBook.name);
          this.memberSelect(user);
        }
        else {
          // This condition is to verify if the book quantity is greater that 0 or with stock
          if (findBook.quantity > 0) {
            findBook.quantity -= 1;
            findBook.borrowedBy = [...findBook.borrowedBy, { userName: user.userName, fullName: user.fullName }];

            console.log(textColor.green(`Successfuly borrowed book: ${findBook.name}`));
            
            this.members[indexOfUser].borrowedBooks = [...this.members[indexOfUser].borrowedBooks, findBook.name]

            this.memberSelect(user);
          }
          else {
            console.clear();
            console.log(textColor.red("The book you enter is out of stock!"));
            this.memberSelect(user);
          }
        }
        
        
        
        

        
      }
      else {
        console.clear();
        console.log(textColor.red("The book you enter is not in the system!"));
        this.memberSelect(user);
      }
    })

  }

  run() {
    console.clear();
   this.mainPage()
   
  }
  
}



const myApp = new App("Library System")

myApp.run()


   


