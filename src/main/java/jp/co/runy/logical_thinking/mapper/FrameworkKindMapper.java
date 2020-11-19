package jp.co.runy.logical_thinking.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import jp.co.runy.logical_thinking.domain.FrameworkKind;

/**
 * @author okazakitatsuro
 * フレームワーク分類テーブルから情報を取得するためのマッパー
 */
@Mapper
public interface FrameworkKindMapper {
	List<FrameworkKind> findFrameworkKind();
}
