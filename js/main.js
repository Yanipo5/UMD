angular
  .module("main", [])
  .controller("main-controller", $scope => {
    $scope.contact = {};

    /**
     *@public
     *@
     *@description: will save the $scope.contact into an array in localStore. saving to localStore to make it an entrely local app. in a real production system server & data base are required to achive persistancy.
     */
    $scope.save = () => {
      var contacts = getContactsFromlocalStore() || [];
      contacts.push($scope.contact);
      saveContactsTolocalStore(contacts);
      const msg = `Add name: ${$scope.contact.name} 
      phone: ${$scope.contact.phone} 
      email: ${$scope.contact.email}`;
      swal("Contact Added!", msg, "success");
      $scope.contact = {};
    };

    function saveContactsTolocalStore(contacts) {
      window.localStorage.setItem("contacts", JSON.stringify(contacts));
    }
  })
  .controller("login-controller", $scope => {
    {
      //run once, then const will clear
      const auth = window.localStorage.getItem("auth") === `true`;
      if (auth) {
        window.location = "table.html";
      }
    }

    $scope.user = {};
    /**
     *@description: if credentials are correct, will redirect user to the table page.
     *@public
     */
    $scope.login = () => {
      const user = $scope.user;
      if (user.name === "user" && user.password === "pass") {
        window.localStorage.setItem("auth", true);
        window.location = "table.html";
      } else {
        $scope.error = "user name and password are incorrect";
      }
    };
  })
  .controller("table-controller", $scope => {
    $scope.contacts = getContactsFromlocalStore();

    {
      //run once, then const will clear
      const auth = window.localStorage.getItem("auth") === `true`;
      if (!auth) {
        window.location = "login.html";
      }
    }

    /**
     * @description: logout and redirect the user.
     */
    $scope.logout = () => {
      window.localStorage.setItem("auth", false);
      window.location = "login.html";
    };
  })
  .directive("contactsPersonTable", () => {
    return {
      templateUrl: "components/contactsPersonTable.html"
    };
  });

function getContactsFromlocalStore() {
  return JSON.parse(window.localStorage.getItem("contacts"));
}
