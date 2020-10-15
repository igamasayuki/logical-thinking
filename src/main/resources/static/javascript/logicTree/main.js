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
                  new_list = '<secion class="fw" id="'+ fwId +'">' + 
                  '<div id="' + fhId + '">' + 
                  '<div class="row">' + 
                  '<label for="" class="col-11">' +
                  data[index].element + 'に関する具体的な【<font class="test">' + clarify + '</font>】を挙げてください' + 
                  '</label>' +
                  '<button type="button" onclick="button(\'' + fwId + '\', \'delete\')" id="' + deleteFh + '" class="btn btn-danger col-1">削除</button>' + 
                  '</div>' +
                  '</div>' + 
                  '</secion>';
                  $('#hierarchy').append(new_list);
                    // 「第二階層を追加」ボタンを追加
                    secondHierarchyButton = '<div id="addSh' + data[index].id + '" class="row"><button onclick="button(\'' + fhId + '\', \'addSh\', \'' + shId + '\')" class="btn btn-primary col-3 mb-2">第二階層を追加する</button></div>'
                    $('#fw' + data[index].id).append(secondHierarchyButton);

                    // 「〇〇」を言い換えるとを追加
                    anotherWordText = '<br>' + 
                    '<div class="row">' +
                    '<label for="">「' + data[index].element + '」を言い換えると何ですか？</label>' + 
                    '</div>' + 
                    '<div class="row">' + 
                    '<input type="text" class="form-control mb-5" value="">' + 
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
            logicTree : {
                partnerWants = $('#partnerWants').val(),
                currentState = $('#currentState').val(),
                descriptionType = $('input[name="clarify"]').val(),
                frameworkId = $('[name="fw"]').val(),
                insistence = $('#insistence').val()
            }

            for (let index = 0; index < $('.fw').length; index++) {
                const element = $('.fw')[index];
                console.log(element);
                
            }

        });
    });

    function button(selectedId, option, name){
        console.log('button()が呼ばれている')
        console.log(option)
        switch (option) {
            case 'delete':
                $('#' + selectedId).remove();
                break;
            case 'addFH':
                clarify = $('input[name="clarify"]').val() == 1 ? '原因(理由)' : '方法';
                secondHierarchyButton = '<div class="row"><button onclick="button(this, \'addSh\')" class="btn btn-primary col-3 mb-2">第二階層を追加する</button></div>'

                addHtml = '<section class="fw">' + 
                '<div>' + 
                '<div class="row">' + 
                '<label for="" class="col-11">' +
                '<input type="text"></input>'+ 'に関する具体的な【<font class="test">' + clarify + '</font>】を挙げてください' + 
                '</label>' +
                '<button type="button" class="btn btn-danger col-1">削除</button>' + 
                '</div>' +
                '</div>' + secondHierarchyButton +
                '</section>';

                $(selectedId).parent().before(addHtml);
                // 「第二階層を追加」ボタンを追加
                // $(selectedId).parent().before(secondHierarchyButton);
                break;
            case 'addSh':
                if (typeof selectedId === 'string') {
                    // 第二階層入力時に「第三階層を追加する」ボタンを追加する
                    addHtml = '<div class="aaa" name="' + name + '">' + 
                    '<div class="row"><label for="" class="col-2">第二階層：</label>' + 
                    '<input type="text" class="form-control col-9" value="">' + 
                    '<button type="button" class="btn btn-primary col-1">削除</button>' + 
                    '</div>' + 
                    '<div class="row">' + 
                    '<button onclick="button(\'this\', \'addTH\')" type="button" class="btn btn-info offset-1 col-3 mb-2">第三階層を追加</button>' + 
                    '</div>' + 
                    '</div>';
                    $('#' + selectedId).after(addHtml);
                } else if (typeof selectedId === 'object'){
                    console.log('object')
                }
                break;
            case 'addTH':
                
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



