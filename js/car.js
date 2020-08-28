$(function () {
    // 1.全选全不选功能模块
    // 把全选按钮的状态赋值给小按钮的状态
    $(".checkall").change(function () {
        $(".j-checkbox, .checkall").prop("checked", $(this).prop("checked"));
        if ($(this).prop("checked")) {
            // 让所有的商品添加 check-cart-item 类名
            $(".cart-item").addClass("check-cart-item");
        } else {
            $(".cart-item").removeClass("check-cart-item");
        }
    });

    // 2. 如果小复选框被选中的个数等于3 就应该把全选按钮选上，否则全选按钮不选。
    $(".j-checkbox").change(function () {
        if ($(".j-checkbox:checked").length === $(".j-checkbox").length) {
            $(".checkall").prop("checked", true);
        } else {
            $(".checkall").prop("checked", false);
        }
        if ($(this).prop("checked")) {
            $(this).parents(".cart-item").addClass("check-cart-item");
        } else {
            $(this).parents(".cart-item").removeClass("check-cart-item");
        }
    });

    // 3.加减模块
    $(".increment").click(function () {
        var n = $(this).siblings(".itxt").val();
        n++;
        $(this).siblings(".itxt").val(n);
        // 小计模块
        // var p = $(this).parent().parent().siblings(".p-price").html();
        // parents() 返回指定的祖先元素
        var p = $(this).parents(".p-num").siblings(".p-price").html();
        p = p.substr(1);
        var price = (p * n).toFixed(2);
        $(this)
            .parents(".p-num")
            .siblings(".p-sum")
            .html("￥" + price);
        getSum();
    });

    $(".decrement").click(function () {
        var n = $(this).siblings(".itxt").val();
        if (n == 1) {
            return false;
        }
        n--;
        $(this).siblings(".itxt").val(n);
        // 4.小计模块
        var p = $(this).parents(".p-num").siblings(".p-price").html();
        p = p.substr(1);
        $(this)
            .parents(".p-num")
            .siblings(".p-sum")
            .html("￥" + (p * n).toFixed(2));
        getSum();
    });

    // 用户修改文本框的值，计算小计模块
    getSum();
    $(".itxt").change(function () {
        var n = $(this).val();
        var p = $(".itxt").parents(".p-num").siblings(".p-price").html();
        p = p.substr(1);
        $(this)
            .parents(".p-num")
            .siblings(".p-sum")
            .html("￥" + (p * n).toFixed(2));
        getSum();
    });

    // 5.计算总计和总额模块(封装函数)
    function getSum() {
        var count = 0;
        var money = 0;
        $(".itxt").each(function (i, ele) {
            count += parseInt($(ele).val());
        });
        $(".amount-sum em").text(count);

        $(".p-sum").each(function (i, ele) {
            money += parseFloat($(ele).text().substr(1));
        });
        $(".price-sum em").text("￥" + money.toFixed(2));
    }

    // 6.删除模块
    // (1)商品后面的删除按钮
    $(".p-action a").click(function () {
        $(this).parents(".cart-item").remove();
        getSum();
    });
    // (2)删除选中商品
    $(".remove-batch").click(function () {
        // .j-checkbox:checked 被选中的商品
        $(".j-checkbox:checked").parents(".cart-item").remove();
        getSum();
    });
    // (3)清理购物车
    $(".clear-all").click(function () {
        $(".cart-item").remove();
        getSum();
    });
});