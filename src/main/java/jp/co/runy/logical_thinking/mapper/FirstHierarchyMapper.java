package jp.co.runy.logical_thinking.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import jp.co.runy.logical_thinking.domain.FirstHierarchy;

@Mapper
public interface FirstHierarchyMapper {
	int upsert(FirstHierarchy firstHierarchy);
	public List<FirstHierarchy> selectFirstHierarchy();
}
