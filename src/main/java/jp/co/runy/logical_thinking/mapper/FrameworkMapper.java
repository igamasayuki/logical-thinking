package jp.co.runy.logical_thinking.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import jp.co.runy.logical_thinking.domain.Framework;

/**
 * @author takahashikouhei
 * フレームワークテーブルから情報を取得するためのマッパー
 */
@Mapper
public interface FrameworkMapper {
	List<Framework> findAll();
	List<Framework> findFramework(int id);
	
	/**
	 * frameworkIdからframeworksテーブルとframework_elementsテーブルを結合した結果を取得する.
	 * 
	 * @author nonaka
	 * 
	 * @param frameworkId フレームワークID
	 * @return フレームワークIDの一致したフレームワークリスト
	 */
	Framework findById(@Param("frameworkId") Integer frameworkId);
}