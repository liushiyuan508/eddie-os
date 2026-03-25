#!/usr/bin/env python3
"""
数据文件处理器
功能：读取指定的Excel文件（.xlsx）或CSV文件（.csv），按照"粉丝数"字段进行倒序排序，生成processed_data.xlsx文件

使用方法：
python3 excel_processor.py <输入文件路径>

示例：
python3 excel_processor.py test_data_fans.xlsx
python3 excel_processor.py test_data_fans.csv

依赖：
pandas 和 openpyxl 库
安装方法：pip3 install pandas openpyxl

注意：
- 如果遇到"xcode-select: note: No developer tools were found"错误，需要先安装Xcode命令行工具
- 安装命令：xcode-select --install
- 或者从App Store安装完整的Xcode应用
"""

import sys
import os

def check_dependencies():
    """检查必要的依赖库是否安装"""
    try:
        import pandas as pd
        import openpyxl
        return True
    except ImportError:
        return False

def process_excel(input_file):
    try:
        # 检查依赖
        if not check_dependencies():
            print("错误：缺少必要的依赖库")
            print("请先安装pandas和openpyxl库：")
            print("pip3 install pandas openpyxl")
            print("\n如果遇到Xcode相关错误，请先安装Xcode命令行工具：")
            print("xcode-select --install")
            return
        
        # 导入依赖
        import pandas as pd
        
        # 检查文件是否存在
        if not os.path.exists(input_file):
            print(f"错误：文件 {input_file} 不存在")
            return
        
        # 检查文件扩展名
        file_ext = input_file.lower().split('.')[-1]
        if file_ext not in ['xlsx', 'csv']:
            print("错误：请提供.xlsx或.csv格式的文件")
            return
        
        # 读取文件
        print(f"正在读取文件：{input_file}")
        if file_ext == 'xlsx':
            df = pd.read_excel(input_file, engine='openpyxl')
        else:  # csv
            df = pd.read_csv(input_file)
        
        # 检查是否存在"粉丝数"列
        if "粉丝数" not in df.columns:
            print("错误：文件中没有'粉丝数'列")
            print("文件中的列：")
            print(df.columns.tolist())
            return
        
        # 检查"粉丝数"列是否为数值类型
        if not pd.api.types.is_numeric_dtype(df["粉丝数"]):
            print("错误：'粉丝数'列不是数值类型，请确保数据格式正确")
            return
        
        # 按照"粉丝数"字段进行倒序排序
        print("正在按照'粉丝数'字段进行倒序排序...")
        df_sorted = df.sort_values(by="粉丝数", ascending=False)
        
        # 生成processed_data.xlsx文件
        output_file = "processed_data.xlsx"
        df_sorted.to_excel(output_file, index=False)
        
        print(f"\n处理完成！")
        print(f"已生成文件: {output_file}")
        print(f"排序后的前5行数据：")
        print(df_sorted.head())
        print(f"\n文件已保存到：{os.path.abspath(output_file)}")
        
    except FileNotFoundError:
        print(f"错误：文件 {input_file} 不存在")
    except Exception as e:
        print(f"错误：{str(e)}")
        print("\n提示：请确保已安装必要的依赖库")
        print("安装命令：pip3 install pandas openpyxl")
        print("\n如果遇到Xcode相关错误，请先安装Xcode命令行工具：")
        print("xcode-select --install")

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print(__doc__)
    else:
        input_file = sys.argv[1]
        process_excel(input_file)