(function() {
'use strict';

angular.module('ShoppingListCheckOff',[])

.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

// LIST1
ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var list1 = this;
  list1.items = ShoppingListCheckOffService.getItems();
  list1.removeItem = function (itemIndex) {
    try {
        ShoppingListCheckOffService.removeItem(itemIndex);
    } catch (error) {
      list1.emptyMessage = error.message;
    }
  };
}

// LIST2
AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var list2 = this;
  list2.boughtItems = ShoppingListCheckOffService.getboughtItems();
}

function ShoppingListCheckOffService() {
  var service = this;
  var items = [
                {
                  name:'pizza',
                  quantity: 2
                },
                {
                  name:'cookies',
                  quantity: 4
                },
                {
                  name:'cheese',
                  quantity: 5
                },
                {
                  name:'bananas',
                  quantity: 2
                },
                {
                  name:'oranges',
                  quantity: 10
                },
                {
                  name:'apples',
                  quantity: 6
                }
              ];  
  
  var boughtItems = [];

  service.addItem = function (item) {
    if ((item.name !='' && item.quantity !='')) {
      boughtItems.push(item);
      item = {
            name: '',
            quantity: ''
            };
            
    }
    return boughtItems;
  };

  service.removeItem = function (itemIndex) {
    var item = {
        name: items[itemIndex].name,
        quantity: items[itemIndex].quantity
    };
    boughtItems = service.addItem(item);
    items.splice(itemIndex, 1);
    
    if (items.length < 1) {
      throw new Error("Everything is bought!");
    }   
    return boughtItems;
  };

  service.getItems = function () {
    return items;
  };

  service.getboughtItems = function () {
    return boughtItems;
  };
  
}

})();