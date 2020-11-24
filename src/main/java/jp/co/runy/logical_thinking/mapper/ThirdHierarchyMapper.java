package jp.co.runy.logical_thinking.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import jp.co.runy.logical_thinking.domain.ThirdHierarchy;

@Mapper
public interface ThirdHierarchyMapper {
	public List<ThirdHierarchy> selectThirdHierarchy();
}
