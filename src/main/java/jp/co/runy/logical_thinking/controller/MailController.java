package jp.co.runy.logical_thinking.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import jp.co.runy.logical_thinking.service.LogicTreeService;

/**
 * @author nakagawatomoya
 *「Step3 生成されたメール文章」で使用するコントローラクラス
 */
@Controller
public class MailController {
	
	@Autowired
	private LogicTreeService logicTreeService;
	
	/**
	 * @param model
	 * @return 「Step3 生成されたメール文章」ページ
	 */
	@RequestMapping(value = "/logicalthinking/mail")
	public String testMail(Model model) {
		List<String> logicTreeList = new ArrayList<String>();
		logicTreeList.add("コミュニケーションが普通に取れる人月30万円程度のJavaのWebエンジニアを派遣して欲しい");
		logicTreeList.add("コミュニケーションが取れるJavaのWebエンジニアは人月40万円が相場である");
		logicTreeList.add("30万円のエンジニアを提案する");
		
		model.addAttribute("logicTreeList", logicTreeList);
		
		List<String> firstHierarchyList = new ArrayList<String>();
		firstHierarchyList.add("ヒト");
		firstHierarchyList.add("モノ");
		firstHierarchyList.add("カネ");
		firstHierarchyList.add("情報");
		
		model.addAttribute("firstHierarchyList", firstHierarchyList);
		
		List<String> secondHierarchyList = new ArrayList<String>();
		secondHierarchyList.add("30万円のエンジニアを提案する");
		secondHierarchyList.add("相場通りのエンジニアをご検討いただく");
		
		model.addAttribute("secondHierarchyList", secondHierarchyList);
		
		List<String> thirdHierarchyList = new ArrayList<String>();
		thirdHierarchyList.add("コミュニケーションは取れないが安いエンジニアを提案する");
		thirdHierarchyList.add("コミュニケーションは取れるがJavaの経験が浅いエンジニアを提案する");
		
		model.addAttribute("thirdHierarchyList", thirdHierarchyList);
		
		List<String> pyramidList = new ArrayList<String>();
		pyramidList.add("自社、競合、顧客、チャネルの観点から30万円のエンジニアを提案する");
		
		model.addAttribute("pyramidList", pyramidList);
		
		List<String> reasonList = new ArrayList<String>();
		reasonList.add("自社");
		reasonList.add("サポート体勢を強化することを検討します");
		reasonList.add("自社によるサポート体制の強化");
		reasonList.add("競合");
		reasonList.add("他社のエンジニアと比較しても品質は高く、結果的に工数が少なく（TCO:トータルコストオブオーナーシップ）は廉価で済みます");
		reasonList.add("競合に対する優位性");
		reasonList.add("顧客");
		reasonList.add("（１）プロジェクト期間が短くできます\n" + 
				"（２）お客様サイドにおける管理工数が低くなります");
		reasonList.add("顧客のメリット");
		reasonList.add("チャネル");
		reasonList.add("そこまでのクオリティが不要と言う場合は、当社パートナーにも優秀なエンジニアがおりますので、ご提案可能です");
		reasonList.add("当社のアライアンスパートナー");
		
		model.addAttribute("reasonList", reasonList);
		
		List<String> exampleList = new ArrayList<String>();
		exampleList.add("以前、他のお客様から同様のご依頼をいただいた際に、サポート態勢強化をしましたら、非常にご満足いただけるサービスレベルとご回答いただいております");
		exampleList.add("当社では、プロジェクト終了時にアンケートを実施しており、顧客満足度4.2となっております。評価詳細をみると、生産性の高さのご意見を多くいただいています");
		exampleList.add("(１）先述の通り、当社のエンジニアは生産性が高いことから、結果プロジェクト期間を短くした事例が多数あります");
		exampleList.add("(２)当社比で、5年前に比べると、お客様の管理工数が約３５％削減できているデータがあります");
		exampleList.add("昨年度実績で申し上げますと、当社が携わるプロジェクトの７０％にアライアンスパートナーのエンジニアが参画しております。当社のアライアンスエンジニアになるためには、当社独自のテストをクリアする必要があります。こう言ったプロセスを経て、エンジニアの質の担保を行っています");
		
		model.addAttribute("exampleList", exampleList);
		
		return "/mail/main";
		
	}

}
