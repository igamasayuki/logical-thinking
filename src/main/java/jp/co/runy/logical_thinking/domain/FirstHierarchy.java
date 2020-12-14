package jp.co.runy.logical_thinking.domain;

import java.util.List;

import lombok.Data;

/**
 * @author takahashikouhei
 * ロジックツリーの第一階層のクラス.
 */
@Data
public class FirstHierarchy {
	
	private int id;
	private String word;
	private String anotherWord;
	private int logicTreeId;
	private Integer displayOrder;
	private List<SecondHierarchy> secondHierarchyList;
	
}
