/**
 * ロジカルツリー図の作成を行う.
 * 
 * @author nonaka
 * 
 * @param logicTree ロジックツリー情報
 */
const loadJsmind = (logicTree) => {
	/** 課題部分の作成を行う */
	const task = createTask(logicTree)
	/** 子要素(第一,二,三階層)の作成を行う(現状第一のみ) */
	const children = createChildren(logicTree.firstHierarchyList);
	/** マインドマップの作成 */
    const mind = {
        "meta":{
            "name":"jsMind remote"
        },
        "format":"node_tree",
        "data":{"id":"root","topic":`課題<br>${task}`, children
        //ロジックマップ作成後消去予定
//        	[
//            {"id":"easy","topic":"ヒト<br>Javaエンジニア","direction":"right","children":[
//                {"id":"test1","topic":"30万円のエンジニア<br>を提案する", "direction": "right", "children": [
//                	{"id": "test11", "topic":"コミュニケーションは取れないが、<br>安いエンジニアを提供する"},
//                	{"id": "test12", "topic":"コミュニケーションは取れるが、<br>Java経験の浅いエンジニアを提供する"}
//                ]},
//                {"id":"test2","topic":"相場通りのエンジニア<br>をご検討いただく", "direction": "right", "children": [
//                	{"id": "test21", "topic": "値段は高いがコミュニケーションが<br>取れるJavaのエンジニアを<br>ご検討いただく"}
//                ]},
//            ]},
//            {"id":"open","topic":"モノ<br>設備","direction":"bottom","children":[
//                {"id":"open1","topic":"リモートワークにする"},
//                {"id":"open2","topic":"ハイスペックPCを支給する"},
//                {"id":"open3","topic":"たつや学長の誰でも完璧<br>メールを使う"}
//            ]},
//            {"id":"powerful","topic":"カネ<br>エンジニア単価","direction":"bottom","children":[
//                {"id":"powerful1","topic":"3ヵ月分一括払い<br>にしてもらえれば<br>20%ディスカウントにする"},
//                {"id":"powerful2","topic":"成果が出せていなければ<br>値引きする"}
//            ]},
//            {"id":"other","topic":"情報<br>エンジニア派遣の市況","direction":"bottom","children":[
//                {"id":"other1","topic":"派遣したエンジニアから<br>取れないような情報の差分<br>を自社から提供する"},
//                {"id":"other2","topic":"毎月お得な技術方法をお客様に配信する"}
//            ]}
//        ]
        }
    };
	
    const options = {
        container:'jsmind_container',
        editable:true,
        theme:'primary'
    }
    
    const jm = jsMind.show(options,mind);
    jm.add_node("sub2","sub23", "new node", {"background-color":"red"});
    jm.set_node_color('sub21', 'green', '#ccc');
}

/**
 * ロジックツリーの子要素を追加する.
 * 
 * @author nonaka
 * 
 * @param firstHierarchyList 第一階層情報リスト
 * @return 第一階層情報
 */
const createChildren = (firstHierarchyList) => {
	/** 第一階層のマインドマップを作成する */
	const children = firstHierarchyList.map((firstHierarchy) => {
		return {'id': `${firstHierarchy.element}`, 'topic': `${firstHierarchy.element}<br>${firstHierarchy.anotherWord}`, "direction": "right"}
	});
	return children
}
 
/**
 * ロジックツリー課題部分の作成を行う.
 * 
 * @author nonaka
 * 
 * @param partnerWants 求めるもの
 * @param currentState 現状
 * @param descriptionType 説明文の種類(1=原因,2=方法)
 * @return 課題情報
 */
const createTask = ({ partnerWants, currentState, descriptionType }) => {
	const type = descriptionType === '1' ? `この課題の原因にはどのようなものが考えられるか？` : `この課題を解決するにはどのような方法が考えられるか？` ;
	const inputTaskSentense = `${partnerWants}に対して${currentState}のギャップが課題です。${type}`;
	let taskSentense = [];
	for(let i = 0; i <= inputTaskSentense.length; i++){
		let letter = inputTaskSentense.slice(i, i+1)
		if(i != 0 && i % 15 === 0){
			letter += `<br>`
		}
		taskSentense.push(letter)
	}
	taskSentense = taskSentense.join('')
	return taskSentense
}

/** 要素リストの作成 */
let elementList = $('#elementList').val().replace(/[\[\]']+/g, '');
elementList = elementList.split(",");

/** 言い換えた言葉リストの作成 */
let anotherWordList = $('#anotherWordList').val().replace(/[\[\]']+/g, '');
anotherWordList = anotherWordList.split(",");

const firstHierarchyList = []

/** 第一階層リストの作成を行う */
for(let i = 0; i < elementList.length; i++) {
	const firstHierarchy = {
		element: elementList[i],
		anotherWord: anotherWordList[i]
	}
	firstHierarchyList.push(firstHierarchy)
}

/** ロジカルツリーの中身作成 */
const logicTree = {
	partnerWants : $('#partnerWants').val(),
	currentState : $('#currentState').val(),
	descriptionType : $('#descriptionType').val(),
	insistance : $('#insistence').val(),
	firstHierarchyList
}	

loadJsmind(logicTree)			
