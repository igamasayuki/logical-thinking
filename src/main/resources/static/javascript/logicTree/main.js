var descriptionType = false;
var frameworkElement = {};
// function text(){
//     $("#partnerWants").val();
//     console.log("test");
//     console.log($("#partnerWants").val())
// }

function copyInput() {
    $(this).attr("id")
    // console.log($(this).attr('id'))
    // // var mozi = "#partnerWants"
    // var inputValue =  $("#partnerWants").val();
    // console.log(inputValue)
    // // $("#copyPartnerWants").html = 'tst'  + inputValue;
    // document.getElementById("copyPartnerWants").innerHTML = inputValue;
  }
function test(element){
    console.log('test()')
    // console.log(index)
    console.log($(element).attr('id'))
    console.log(this)
    new_html = '<div class="row shdiv"><label for="" class="col-2">第二階層：</label><input type="text" class="form-control col-9 sh" value=""><button type="button" class="btn btn-primary col-1">削除</button></div>'
    thbtn = '<div class="row"><button type="button" class="btn btn-info offset-1 col-3 mb-2">第三階層を追加</button></div>'
    th = '<div class="row"><label for="" class="offset-1 col-2">第三階層：</label><input type="text" class="form-control col-8 float-right" value=""><button type="button" class="btn btn-info col-1">削除</button></div>'

    // $('#sh'+index).before(new_html+thbtn);
};
function deleteh(index) {
    console.log('test')
    console.log(frameworkElement[index - 1])
}
function keyup(thisEle){
    // sectionのnameを取得
    name = $(thisEle).parent().parent().parent().parent().attr('name')
    $('section[name='+ name + '] font[name=word]').html($(thisEle).val())
    $('section[name='+ name + '] input[name=word]').val($(thisEle).val())
}

$(function(){
    // 第二階層入力時に「第三階層を追加する」ボタンを追加する
    // $(document).on('keyup', '.form-control.col-9.sh', function(){
    //     console.log($(this).val())
    //     if($(this).val() != ""){
    //         list = '<div class="row"><label for="" class="offset-1 col-2">第三階層：</label><input type="text" class="form-control col-8 float-right" value="値段は高いがコミュニケーションが取れるJavaのエンジニアをご検討いただく"><button type="button" class="btn btn-info col-1">削除</button></div>'
    //         $('.row.shdiv').after(list);
    //     } else {

    //     }

    // });
    // 「相手が欲しいもの」の入力結果を反映
    $( document ).on( 'keyup', '#partnerWants' , function(){ 
        console.log($( this ).attr('id'))
        $('#copyPartnerWants').html($( this ).val());
    });
    $( document ).on( 'keyup', '#currentState' , function(){ 
        console.log($( this ).attr('id'))
        $('#copyCurrentState').html($( this ).val());
    });
    $('input[name="clarify"]').change(function () {
        if($( this ).val() == 1){
            // 原因(理由)選択
            $('#reason').css("display", "block");
            $('#method').css("display", "none");
            // $('.reason').css("display", "block");
            // $('.method').css("display", "none");
            $('.test').html('原因(理由)');
        } else {
            // 方法選択
            $('#reason').css("display", "none");
            $('#method').css("display", "block");
            // $('.reason').css("display", "none");
            // $('.method').css("display", "block");
            $('.test').html('方法');
        }
      });
      $('[name="fw"]').change(function () {
          clarify = $('input[name="clarify"]').val() == 1 ? '原因(理由)' : '方法';
          $.ajax({
              url: 'http://localhost:8080/api/getframework/' + $(this).val(),
              type: 'get'
          }).done(function(data){
            frameworkElement = data
            // 既存のフレームワークの要素を削除
            $('#hierarchy > div').remove();
            $('#hierarchy > .fw').remove();
              
              // 第一階層を追加
              for (let index = 0; index < data.length; index++) {
                  dataId = data[index].id;
                  fwId = 'fw' + dataId;
                  fhId = 'fh' + dataId;
                  deleteFh = 'deleteFh' + dataId;

                  shId = 'sh' + dataId;

                  console.log(data[index].element)
                  new_list = '<section class="fw" id="'+ fwId +'" name="fh' + index +'">' + 
                  '<div id="' + fhId + '">' + 
                  '<div class="row">' + 
                  '<label for="" class="col-11">' +
                  data[index].element + 'に関する具体的な【<font class="test">' + clarify + '</font>】を挙げてください' + 
                  '</label>' +
                  '<input type="hidden" value="' + data[index].element +  '">'
                  '<button type="button" onclick="button(this, \'delete\')" id="' + deleteFh + '" class="btn btn-danger col-1">削除</button>' + 
                  '</div>' +
                  '</div>' + 
                  '</section>';
                  $('#hierarchy').append(new_list);
                    // 「第二階層を追加」ボタンを追加
                    secondHierarchyButton = '<div id="addSh' + data[index].id + '" class="row"><button onclick="button(\'' + fhId + '\', \'addSh\', \'fh' + index + '\')" class="btn btn-primary col-3 mb-2">第二階層を追加する</button></div>'
                    $('#fw' + data[index].id).append(secondHierarchyButton);

                    // 「〇〇」を言い換えるとを追加
                    anotherWordText = '<br>' + 
                    '<div class="row">' +
                    '<label for="">「' + data[index].element + '」を言い換えると何ですか？</label>' + 
                    '</div>' + 
                    '<div class="row">' + 
                    '<input name="anotherWord" type="text" class="form-control mb-5" value="">' + 
                    '</div>';
                    $('#fw' + data[index].id).append(anotherWordText)

                    
                }
                addFH = '<div class="row">' + 
                    '<button id="addFHButton" onclick="button(this, \'addFH\')" type="button" class="btn btn-danger col-3 mb-5">第一階層を追加する</button>' + 
                    '</div>';
                $('#hierarchy').append(addFH)
            });
        });
        // $('button').on('click', function(){
        //     clarify = $('input[name="clarify"]').val() == 1 ? '原因(理由)' : '方法';
        //     addHtml = '<div>' + 
        //     '<div>' + 
        //     '<div class="row">' + 
        //     '<label for="" class="col-11">' +
        //     '<input type="text></input>"'+ 'に関する具体的な【<font class="test">' + clarify + '</font>】を挙げてください' + 
        //     '</label>' +
        //     '<button type="button" class="btn btn-danger col-1">削除</button>' + 
        //     '</div>' +
        //     '</div>' + 
        //     '</div>';
        //     console.log("ボタンが押された");
        //     console.log($(this).attr('id'));
        //     $(this).before('<button>addボタン</button>')
        // });
        $('#submit').on('click', function(){
            console.log('submit');
            logicTree = {
                partnerWants : $('#partnerWants').val(),
                currentState : $('#currentState').val(),
                descriptionType : $('input[name="clarify"]').val(),
                frameworkId : $('[name="fw"]').val(),
                insistence : $('#insistence').val(),
                firstHierarchyList : []
            }
            firstHierarchyList = [];
            // 第一階層の数を取得
            for(let index = 0; index < $('.fw').length; index++){
                fHName = 'fh' + index;
                firstHierarchy = {
                    word : $('section[name=' + fHName + '] div div input').val(),
                    anotherWord : $('section[name=' + fHName + '] input[name=anotherWord]').val(),
                    logicTreeId : null,
                    scondHierarchyList : []
                }
                // 直下の子要素(section)の長さを取得
                for(let index2 = 0; index2 < $('section[name=' + fHName + ']').children('section').length; index2++){
                    sHName = fHName + '_sh' + index2;
                    secondHierarchy = {
                        explanation : $('section[name=' + sHName + '] input').val(),
                        thirdHierarchyList : []
                    }
                    for(let index3 = 0; index3 < $('section[name=' + sHName + '] section').length; index3++){
                        tHName = sHName + '_th' + index3;
                        thirdHierarchy = {
                            explanation : $('section[name=' + tHName + '] input').val()
                        }
                        console.log(thirdHierarchy)
                        secondHierarchy.thirdHierarchyList.push(thirdHierarchy)
                    }
                    firstHierarchy.scondHierarchyList.push(secondHierarchy)
                }
                logicTree.firstHierarchyList.push(firstHierarchy)
            }
            
            console.log(logicTree)
            var form = document.createElement("form");
            form.setAttribute("action", "/test");
            form.setAttribute("method","post");
            document.body.appendChild(form);
            for(var parame in logicTree){
                console.log(parame)
                console.log(logicTree[parame])

                var input = document.createElement('input');
                input.setAttribute('type', 'hidden');
                input.setAttribute('name', 'logicTreeForm.'+parame);
                input.setAttribute('value', logicTree[parame]);
                form.appendChild(input);
            }


            form.submit();

        });
    });

    function button(selectedId, option, name){
        console.log('button()が呼ばれている')
        console.log($(selectedId).attr('name'))
        console.log(typeof selectedId)
        // console.log(option)
        switch (option) {
            // 削除
            case 'delete':
                if (typeof selectedId === 'string') {
                    $('#' + selectedId).remove();
                    for (let index = 0; index < $('.fw').length; index++) {
                        $('.fw').eq(index).attr('name','fh' + index)  
                    }
                } else if(typeof selectedId === 'object'){
                    switch ($(selectedId).attr('name')) {
                        case 'fh':
                            getName = $(selectedId).parent().parent().parent().attr('name');
                            console.log('-------------')
                            console.log(getName)
                            console.log('-------------')
                            $(selectedId).parent().parent().parent().remove()
                            // 名前の連番を修正
                            for (let index = 0; index < $('.fw').length; index++) {
                                $('.fw').eq(index).attr('name','fh' + index)
                                for(let index2 = 0; index2 < $('section[name=fh' + index + ']').children('section').length; index2++){
                                    newSHName = 'fh' + index + '_sh' + index2;
                                    oldSHName =  $('section[name=fh' + index + ']').children('section').eq(index2).attr('name');
                                    $('section[name=fh' + index + ']').children('section').eq(index2).attr('name', newSHName);
                                    console.log('newName= ' + newSHName)
                                    console.log($('section[name=' + newSHName + '] section').length)
                                    for(let index3 = 0; index3 < $('section[name=' + newSHName + '] section').length; index3++) {
                                        $('section[name=' + newSHName + '] section').eq(index3).attr('name', newSHName + '_th' + index3)
                                    }
                                }
                                console.log($('section[name=' + getName + '] session').length)
                            }
                            break;
                            case 'sh':
                                getName = $(selectedId).parent().parent().parent().attr('name');
                                console.log(name)
                                console.log('第二階層を削除')
                                $(selectedId).parent().parent().remove()
                                // selecter = 'section[name=' + name + '] section';
                                selecter = 'section[name=' + getName + ']'
                                // console.log(selecter.length)
                                console.log('-----------')
                                console.log('name='+ name)
                                console.log($(selectedId).parent().parent().parent().attr('name'))
                                console.log(getName)
                                console.log('-----------')
                                for (let index = 0; index < $(selecter).children('section').length; index++) {
                                    newSHName = getName + '_sh' + index;
                                    $(selecter).children('section').eq(index).attr('name',newSHName)
                                    // console.log($(selecter).children('section').eq(index).attr('name'))
                                    // 第三階層のnameを変更
                                    for(let index2 = 0; index2 < $('section[name=' + getName + '_sh' + index + '] section').length; index2++) {
                                        $('section[name=' + getName + '_sh' + index + '] section').eq(index2).attr('name', newSHName + '_th' + index2)
                                    }
                                    // for (let index2 = 0; index < $('section[name=' + name + '_sh' + index + '] section').length; index2++) {
                                        // console.log('2ループ')
                                        // console.log('section[name=' + name + '_sh' + index + '] section直下のsectionの数は?')
                                        // console.log($('section[name=' + name + '_sh' + index + '] section').length)

                                        // $('section[name=' + name + '_sh' + index + '] section').eq(index2).attr('name', name + '_th' + index2)
                                        // console.log($(selecter).eq(index).attr('name'))
                                    // }
                                }
                                break;
                            case 'th':
                                console.log('第三階層を削除');
                                console.log(name)
                                $(selectedId).parent().parent().remove();
                                selecter = 'section[name=' + name + '] section';

                                for (let index = 0; index < $(selecter).length; index++) {
                                    $(selecter).eq(index).attr('name', name + '_th' + index)
                                    // console.log($(selecter).eq(index).attr('name'))
                                }
                                console.log('th delete fin')
                                break;
                        default:
                            break;
                    }

                }
                console.log(typeof selectedId)
                break;
            // 第一階層を追加
            case 'addFH':
                console.log('addFH start')
                console.log('name = ')
                name = 'fh' + $('.fw').length
                console.log(name)
                clarify = $('input[name="clarify"]').val() == 1 ? '原因(理由)' : '方法';
                secondHierarchyButton = '<div class="row"><button onclick="button(this, \'addSh\', \'' + name + '\')" class="btn btn-primary col-3 mb-2">第二階層を追加する</button></div>'

                // 「〇〇」を言い換えるとを追加
                anotherWordText = '<br>' + 
                '<div class="row">' + 
                '<label for="">「 <font name="word"></font>」を言い換えると何ですか？</label>' + 
                '</div>' + 
                '<div class="row">' + 
                '<input name="anotherWord" type="text" class="form-control mb-5" value="">' + 
                '</div>';

                addHtml = '<section class="fw" name="' + name + '">' + 
                '<div>' + 
                '<div class="row">' + 
                '<label for="" class="col-11">' +
                '<input onkeyup="keyup(this)" type="text"></input>'+ 'に関する具体的な【<font class="test">' + clarify + '</font>】を挙げてください' + 
                '</label>' +
                '<button onclick="button(this, \'delete\')" name="fh" type="button" class="btn btn-danger col-1">削除</button>' + 
                '</div>' +
                '</div>' + 
                secondHierarchyButton +
                anotherWordText + 
                '</section>';

                $(selectedId).parent().before(addHtml);
                // 「第二階層を追加」ボタンを追加
                // $(selectedId).parent().before(secondHierarchyButton);
                break;
            // 第二階層を追加
            case 'addSh':
                shName = name + '_sh' + $('.fw[name=' + name + '] section').length

                addHtml = '<section class="" name="' + shName + '">' + 
                '<div class="row">' + 
                '<label for="" class="col-2">第二階層：</label>' + 
                '<input type="text" class="form-control col-9" value="">' + 
                '<button name="sh" onclick="button(this,\'delete\',\'' + name + '\')" type="button" class="btn btn-primary col-1">削除2</button>' + 
                '</div>' + 
                '<div class="row">' + 
                '<button name="th" onclick="button(this, \'addTH\',\'' + shName + '\')" type="button" class="btn btn-info offset-1 col-3 mb-2">第三階層を追加</button>' + 
                '</div>' + 
                '</section>';
                if (typeof selectedId === 'string') {
                    // 第二階層入力時に「第三階層を追加する」ボタンを追加する
                    $('#' + selectedId).after(addHtml);
                } else if (typeof selectedId === 'object'){
                    console.log('object')
                    $(selectedId).parent().before(addHtml);
                }
                break;
                // 第三階層を追加
            case 'addTH':
                console.log(name)
                console.log($('section[name=' + name + '] section').length)
                thName = name + '_th' + $('section[name=' + name + '] section').length
                addHtml = '<section name="' + thName + '">' + 
                '<div class="row"><label for="" class="offset-1 col-2">第三階層：</label>' + 
                '<input type="text" class="form-control col-8 float-right" value="">' +
                '<button name="th" onclick="button(this,\'delete\',\'' + name + '\')" type="button" class="btn btn-info col-1">削除</button>' + 
                '</div>' + 
                '</section>';
                $(selectedId).parent().before(addHtml)
                break;
            default:
                break;
        }
        // if(option === 'delete'){
            
        // } else if (option === 'addFH'){
        //     console.log('addFH')
        //     clarify = $('input[name="clarify"]').val() == 1 ? '原因(理由)' : '方法';
        //     addHtml = '<div>' + 
        //     '<div>' + 
        //     '<div class="row">' + 
        //     '<label for="" class="col-11">' +
        //     '<input type="text"></input>'+ 'に関する具体的な【<font class="test">' + clarify + '</font>】を挙げてください' + 
        //     '</label>' +
        //     '<button type="button" class="btn btn-danger col-1">削除</button>' + 
        //     '</div>' +
        //     '</div>' + 
        //     '</div>';
        //     $(selectedId).parent().before(addHtml);
        //     // 「第二階層を追加」ボタンを追加
        //     secondHierarchyButton = '<div class="row"><button onclick="button(this, \'addSh\')" class="btn btn-primary col-3 mb-2">第二階層を追加する</button></div>'
        //     $(selectedId).parent().before(secondHierarchyButton);
        //     // console.log($(selectedId).parent())
        //     // $(selectedId + '> div').before('<button>addボタン</button>');
        // } else if (option === 'addSh') {
        //     console.log('追加')
        //     console.log(typeof selectedId)
        //     // 第二階層入力時に「第三階層を追加する」ボタンを追加する
        //     addHtml = '<div class="aaa" name="' + name + '">' + 
        //     '<div class="row"><label for="" class="col-2">第二階層：</label>' + 
        //     '<input type="text" class="form-control col-9" value="">' + 
        //     '<button type="button" class="btn btn-primary col-1">削除</button>' + 
        //     '</div>' + 
        //     '<div class="row">' + 
        //     '<button onclick="button(\'this\', \'addTH\')" type="button" class="btn btn-info offset-1 col-3 mb-2">第三階層を追加</button>' + 
        //     '</div>' + 
        //     '</div>';
        //     $('#' + selectedId).after(addHtml);
        // } else if(option === 'addTH') {
        //     addHtml = '<div><div class="row">' + 
        //     '<label for="" class="offset-1 col-2">第三階層：</label>' + 
        //     '<input type="text" class="form-control col-8 float-right" value="">' + 
        //     '<button type="button" class="btn btn-info col-1">削除</button>' + 
        //     '</div></div>'
        // }
        // $($(element).attr('id')).remove()
    }

    /* 
    メモ
    $('.fw').length で第一階層の数を取得
    欲しいのは, 個別の第二階層を取得する方法

    */ 


